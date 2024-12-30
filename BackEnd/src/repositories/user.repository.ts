import { Injectable } from "@nestjs/common";
import { IUser } from "@interfaces/context.interface";
import { JwtType } from "@enums/jwt.enum";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { PrismaDatabase } from "@configs/prisma.database";
import { RoleEnum } from "@enums/role.enum";
import { Prisma } from "@prisma/client";

@Injectable()
export class UserRepository implements IUser{

    private database: Prisma.UsersDelegate<DefaultArgs>;
    private x: Prisma.$UsersPayload

    constructor(private prisma: PrismaDatabase) {
        this.database = prisma.users;
    }

    async findAll(): Promise<any>  {
        try {
            return await this.database.findMany()
        } catch (e: any) {
            throw new Error(`Error At UserRepository findAll prisma => ${e.message}`)
        }
    }

    async findById(user_id: number): Promise<any> {
        if (user_id == undefined){
            throw new Error(JwtType.INVALID_USER.toString())
        }
        try {
            const user = await this.database.findUnique({ where: { id: user_id } });
            return user;
        }catch(e: any) {
            throw new Error(`Error At UserRepository findById prisma => ${e.message}`)
        }
    }

    async findByAuthId(auth_id: number): Promise<any> {
        if (auth_id == undefined){
            throw new Error(JwtType.INVALID_USER.toString())
        }
        try {
            const user = await this.database.findFirst({ where: { auth_id } });
            return user;
        }catch(e: any) {
            throw new Error(`Error At UserRepository findByAuthId prisma => ${e.message}`)
        }
    }

    async insert({ nickName, phone, bornDate, auth_id }: any): Promise<any> {
        const user = await this.database.create({
            data:{
                nickName,
                bornDate,
                active: true,
                phone,
                auth_id
            }
        }).catch((e: any) => {
            throw new Error(`Error at UserRepository insert Prisma=> ${e.message}`)
        })
        return user;
    }

    async update({ id, nickName, active, bornDate, phone, auth_id }: any): Promise<any> {
        const user = await this.database.update({
            where: { id },
            data: {
                nickName,
                bornDate,
                active,
                phone,
                auth_id
            }
        }).catch((e: any) => {
            throw new Error(`Error At UserRepository update prisma => ${e.message}`)
        })
        return user
    }

    async disableUserByAuthId(auth_id: number): Promise<any> {
        const user = await this.database.updateMany({
            where: { auth_id },
            data: {
                active: false,
            }
        }).catch((e: any) => {
            throw new Error(`Error At UserRepository disable prisma => ${e.message}`)
        })
        return user
    }
}