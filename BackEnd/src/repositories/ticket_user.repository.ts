import { Injectable } from "@nestjs/common";
import { PrismaDatabase } from "@configs/prisma.database";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { TicketsRepository } from "./tickets.repository";
import { LimitTicketEnum } from "@/shared/enums/general.enum";

@Injectable()
export class TicketUserRepository {

    private database: Prisma.Ticket_userDelegate<DefaultArgs>;

    constructor(private prisma: PrismaDatabase) {
        this.database = prisma.ticket_user;
    }

    async findByObj({ ticket_id, user_id, purchase_date }: any): Promise<any> {
        try {
            const result = await this.database.findUnique({ 
                where: {
                    ticket_id_user_id_purchase_date: {
                        purchase_date,
                        ticket_id,
                        user_id
                    },
                }
            });
            return result;
        } catch (e) {
            throw new Error(`Error At TicketUserRepository findByObj prisma => ${e.message}`)
        }
    }

    async getUserEventsByUserId(user_id: number): Promise<any> {
        try {
            const rawQuery = `
                SELECT
                    e.id::integer,
                    e.city as local, 
                    tt.description as type,
                    TO_CHAR(tu.purchase_date, 'DD/MM/YYYY') as date_buy,
                    TO_CHAR(e.event_initial_date, 'DD/MM') as date_event_initial,
                    TO_CHAR(e.event_end_date, 'DD/MM/YYYY') as date_event,                      
                    ti.value as value_per_ticket,
                    tu.quantity as qnt
                FROM tickets as ti
                INNER JOIN ticket_type as tt ON tt.id = ti.ticket_type_id
                INNER JOIN events as e ON e.id = ti.event_id
                INNER JOIN ticket_user as tu ON tu.ticket_id = ti.id
                WHERE tu.user_id = ${user_id}
            `
            const result = await this.prisma.$queryRaw(Prisma.sql([rawQuery]))
            
            return result;
        } catch (e) {
            throw new Error(`Error At TicketUserRepository getUserEventsByUserId prisma => ${e.message}`)
        }
    }

    async checkLimit(ticket_id: number, typeTicket: any): Promise<boolean> {
        try {
            const { acronym } = typeTicket.ticket_type;
            const result = await this.database.aggregate({
                _sum: {
                    quantity: true
                },
                where: {
                    ticket_id
                },
            });
            return result["_sum"].quantity ? result["_sum"].quantity < parseInt(LimitTicketEnum[acronym]) : true
        } catch (e) {
            throw new Error(`Error At TicketUserRepository checkLimit prisma => ${e.message}`)
        }
    }

    async create({ ticket_id, user_id, purchase_date }: any): Promise<any> {
        try {
            const data: any= {
                ticket_id, user_id, purchase_date, quantity: 1
            }
            const ticket_user = await this.database.create({ data }).catch((e) => {
                throw new Error(`Error at TicketUserRepository create Prisma=> ${e.message}`)
            })
            return ticket_user
        } catch (e) {
            throw new Error(`Error at TicketUserRepository create prisma => ${e.message}`)
        }
    }

    async update({ ticket_id, user_id, purchase_date }: any): Promise<any> {
        try {
            const ticketUser = await this.findByObj({ ticket_id, user_id, purchase_date});
            const quantity = ticketUser.quantity + 1;
            const events = await this.database.update({
                where: { ticket_id_user_id_purchase_date: { ticket_id, user_id, purchase_date}}, 
                data: {
                    user_id, 
                    purchase_date, 
                    quantity
                }
            }).catch((e) => {
                throw new Error(`Error at TicketUserRepository update Prisma=> ${e.message}`)
            })
            return events
        } catch (e) {
            throw new Error(`Error at TicketUserRepository update prisma => ${e.message}`)
        }
    }
}