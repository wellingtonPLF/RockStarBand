import { Injectable } from "@nestjs/common";
import { IAuth } from "@interfaces/context.interface";
import { PrismaDatabase } from "@configs/prisma.database";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

@Injectable()
export class AuthRepository implements IAuth{

    private database: Prisma.AuthsDelegate<DefaultArgs>;

    constructor(private prisma: PrismaDatabase) {
        this.database = prisma.auths;
    }

    async findById(auth_id: number): Promise<any> {
        try {
            const result = await this.database.findUnique({ where: { id: auth_id } });
            return result;
        } catch (e) {
            throw new Error(`Error At AuthRepository findById prisma => ${e.message}`)
        }
    }

    async findByEmail(email: string): Promise<any> {
        if (email == undefined){
            throw new Error(`Error At AuthRepository findByEmail repository: email = ${email}`)
        }
        try {
            const result = await this.database.findFirst({ where: { email, active: true } });
            return result;
        } catch (e) {
            throw new Error(`Error At AuthRepository findByEmail prisma => ${e.message}`)
        }
    }

    async findByUsername(username: string): Promise<any> {
        if (username == undefined){
            throw new Error(`Error At AuthRepository findByUsername repository: username = ${username}`)
        }
        try{
            const auth = await this.database.findFirst({ where: { username, active: true } });
            return auth;
        }
        catch(e){
            throw new Error(`Error At AuthRepository findByUsername prisma => ${e.message}`)
        }
    }

    async findByUserId(user_id: number): Promise<any> {
        if (user_id == undefined){
            throw new Error(`Error At AuthRepository findByUserId repository: id = ${user_id}`)
        }
        try {
            const user = await this.prisma.users.findUniqueOrThrow({ where: { id: user_id } });
            const result = await this.database.findUniqueOrThrow({ where: { id: user.auth_id } });
            return result;
        } catch (e) {
            throw new Error(`Error At AuthRepository findByUserId prisma => ${e.message}`)
        }
    }

    async findAuthRolesByAuthId(auth_id: number): Promise<any> {
        if (auth_id == undefined){
            throw new Error(`Error At AuthRepository findAuthRolesByAuthId repository: id = ${auth_id}`)
        }
        try {
            const result = await this.prisma.auth_roles.findFirst({ where: { auth_id } });
            return result;
        } catch (e) {
            throw new Error(`Error At AuthRepository findAuthRolesByAuthId prisma => ${e.message}`)
        }
    }

    async create({ email, username, password, role_id }: any): Promise<any> {
        const already_have = await this.findByEmail(email)
        if (already_have != undefined) {
            throw new Error(`O Email ${email} já esta cadastrado no sistema.`)
        }

        try {
            const auth = await this.database.create({ data: {
                email: email,
                active: true,
                username: username,
                password: password
            } }).catch((e) => {
                throw new Error(`Error at AuthRepository create Prisma=> ${e.message}`)
            })

            await this.prisma.auth_roles.create({ data: { auth_id: auth.id, role_id }})
            return auth;

        } catch (e) {
            throw new Error(`Error at AuthRepository create prisma => ${e.message}`)
        }
    }

    async update({ id, email, username, password }: any): Promise<any> {
        await this.database.update({
            where: { id },
            data: {
                email: email, 
                username: username, 
                password: password
            }
        }).catch((e) => {
            throw new Error(`Error at AuthRepository update prisma => ${e.message}`)
        })
    }
}