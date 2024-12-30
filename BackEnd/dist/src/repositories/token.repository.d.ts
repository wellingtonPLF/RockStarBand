import { PrismaDatabase } from "@configs/prisma.database";
import { IToken } from "@interfaces/context.interface";
export declare class TokenRepository implements IToken {
    private prisma;
    private database;
    constructor(prisma: PrismaDatabase);
    findByToken(token: string): Promise<any>;
    findByAuthId(auth_id: number): Promise<any>;
    insert({ key, auth_id }: any): Promise<any>;
    update({ id, key, auth_id }: any): Promise<any>;
    delete(id: number): Promise<any>;
    deleteByAuthID(auth_id: number): Promise<any>;
}
