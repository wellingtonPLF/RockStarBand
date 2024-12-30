import { IUser } from "@interfaces/context.interface";
import { PrismaDatabase } from "@configs/prisma.database";
export declare class UserRepository implements IUser {
    private prisma;
    private database;
    private x;
    constructor(prisma: PrismaDatabase);
    findAll(): Promise<any>;
    findById(user_id: number): Promise<any>;
    findByAuthId(auth_id: number): Promise<any>;
    insert({ nickName, phone, bornDate, auth_id }: any): Promise<any>;
    update({ id, nickName, active, bornDate, phone, auth_id }: any): Promise<any>;
    disableUserByAuthId(auth_id: number): Promise<any>;
}
