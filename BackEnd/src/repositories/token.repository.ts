import { PrismaDatabase } from "@configs/prisma.database";
import { JwtType } from "@enums/jwt.enum";
import { IToken } from "@interfaces/context.interface";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

@Injectable()
export class TokenRepository implements IToken{

    private database: Prisma.TokensDelegate<DefaultArgs>;

    constructor(private prisma: PrismaDatabase) {
        this.database = prisma.tokens;
    }

    async findByToken(token: string): Promise<any> {
        if (token == undefined){
            throw new Error(`Error At TokenRepository findByToken repository: token = ${token}`)
        }
        try {
            const result: any = await this.database.findFirstOrThrow({ where: { key: token } });
            return result;
        }catch(_) {
            throw new Error(JwtType.INVALID_AT);
        }
    }

    async findByAuthId(auth_id: number): Promise<any> {
        if (auth_id == undefined){
            throw new Error(`Error At TokenRepository findByAuthId repository: id = ${auth_id}`)
        }
        try {
            const result = await this.database.findFirstOrThrow({ where: { auth_id } });
            return result[0];
        }catch(_) {
            throw new Error(JwtType.INVALID_AT);
        }
    }

    async insert({ key, auth_id}: any): Promise<any> {
        await this.database.create({ data: {
            key,
            auth_id
        } }).catch((e) => {
            throw new Error(`Error At TokenRepository create query => ${e.message}`)
        })
    }

    async update({ id, key, auth_id }: any): Promise<any> {
        await this.database.update({ where: { id }, data: {
            id,
            key, 
            auth_id, 
        } }).catch((e) => {
            throw new Error(`Error At TokenRepository update query => ${e.message}`)
        })
    }

    async delete(id: number): Promise<any> {
        if (id == undefined){
            throw new Error(`Error At TokenRepository delete repository: id = ${id}`)
        }
        await this.database.delete({ where: { id } }).catch(() => {
            throw new Error("Error at TokenRepository delete query => Can't delete user.")
        });
    }

    async deleteByAuthID(auth_id: number) : Promise<any> {
        if (auth_id == undefined){
            throw new Error(`Error At TokenRepository deleteByAuthID repository: id = ${auth_id}`)
        }
        await this.database.deleteMany({ where: { auth_id } }).catch(() => {
            throw new Error("Error at TokenRepository deleteByAuthID query => Can't delete user by auth_id.")
        });
    }

}