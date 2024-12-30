import { IAuth } from "@interfaces/context.interface";
import { PrismaDatabase } from "@configs/prisma.database";
export declare class AuthRepository implements IAuth {
    private prisma;
    private database;
    constructor(prisma: PrismaDatabase);
    findById(auth_id: number): Promise<any>;
    findByEmail(email: string): Promise<any>;
    findByUsername(username: string): Promise<any>;
    findByUserId(user_id: number): Promise<any>;
    findAuthRolesByAuthId(auth_id: number): Promise<any>;
    create({ email, username, password, role_id }: any): Promise<any>;
    update({ id, email, username, password }: any): Promise<any>;
}
