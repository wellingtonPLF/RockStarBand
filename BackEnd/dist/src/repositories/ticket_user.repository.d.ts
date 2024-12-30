import { PrismaDatabase } from "@configs/prisma.database";
export declare class TicketUserRepository {
    private prisma;
    private database;
    constructor(prisma: PrismaDatabase);
    findByObj({ ticket_id, user_id, purchase_date }: any): Promise<any>;
    getUserEventsByUserId(user_id: number): Promise<any>;
    checkLimit(ticket_id: number, typeTicket: any): Promise<boolean>;
    create({ ticket_id, user_id, purchase_date }: any): Promise<any>;
    update({ ticket_id, user_id, purchase_date }: any): Promise<any>;
}
