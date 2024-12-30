import { PrismaDatabase } from "@configs/prisma.database";
import { ITicket } from "@/shared/interfaces/context.interface";
export declare class TicketsRepository implements ITicket {
    private prisma;
    private database;
    constructor(prisma: PrismaDatabase);
    findAll(): Promise<any>;
    findById(id: number): Promise<any>;
}
