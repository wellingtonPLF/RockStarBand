import { PrismaDatabase } from '@configs/prisma.database';
import { IEvent } from '@/shared/interfaces/context.interface';
export declare class EventsRepository implements IEvent {
    private prisma;
    private database;
    constructor(prisma: PrismaDatabase);
    findAll(): Promise<any>;
    getAllValid(): Promise<any>;
}
