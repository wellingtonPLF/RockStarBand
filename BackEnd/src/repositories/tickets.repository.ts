import { Injectable } from "@nestjs/common";
import { PrismaDatabase } from "@configs/prisma.database";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { ITicket } from "@/shared/interfaces/context.interface";

@Injectable()
export class TicketsRepository implements ITicket {

    private database: Prisma.TicketsDelegate<DefaultArgs>;

    constructor(private prisma: PrismaDatabase) {
        this.database = prisma.tickets;
    }

    async findAll(): Promise<any> {
        try {
            const result = await this.database.findMany();
            return result;
        } catch (e) {
            throw new Error(`Error At TicketsRepository findAll prisma => ${e.message}`)
        }
    }

    async findById(id: number): Promise<any> {
        try {
            const result = await this.database.findUnique({ where: { id }, select: {
                id: true,
                value: true,
                event_id: true,
                ticket_type: {
                    select: {
                        description: true,
                        acronym: true
                    }
                }
            } });
            return result;
        } catch (e) {
            throw new Error(`Error At TicketsRepository findById prisma => ${e.message}`)
        }
    }

    // async update({ id, ticketType }: any): Promise<any> {
    //     await this.database.update({
    //         where: { ticket_id: id },
    //         data: {
    //             type: ticketType
    //         }
    //     }).catch((e) => {
    //         throw new Error(`Error at TicketsRepository update prisma => ${e.message}`)
    //     })
    // }
}