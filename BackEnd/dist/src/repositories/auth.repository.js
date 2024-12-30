"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_database_1 = require("../config/prisma.database");
let AuthRepository = class AuthRepository {
    constructor(prisma) {
        this.prisma = prisma;
        this.database = prisma.auths;
    }
    async findById(auth_id) {
        try {
            const result = await this.database.findUnique({ where: { id: auth_id } });
            return result;
        }
        catch (e) {
            throw new Error(`Error At AuthRepository findById prisma => ${e.message}`);
        }
    }
    async findByEmail(email) {
        if (email == undefined) {
            throw new Error(`Error At AuthRepository findByEmail repository: email = ${email}`);
        }
        try {
            const result = await this.database.findFirst({ where: { email, active: true } });
            return result;
        }
        catch (e) {
            throw new Error(`Error At AuthRepository findByEmail prisma => ${e.message}`);
        }
    }
    async findByUsername(username) {
        if (username == undefined) {
            throw new Error(`Error At AuthRepository findByUsername repository: username = ${username}`);
        }
        try {
            const auth = await this.database.findFirst({ where: { username, active: true } });
            return auth;
        }
        catch (e) {
            throw new Error(`Error At AuthRepository findByUsername prisma => ${e.message}`);
        }
    }
    async findByUserId(user_id) {
        if (user_id == undefined) {
            throw new Error(`Error At AuthRepository findByUserId repository: id = ${user_id}`);
        }
        try {
            const user = await this.prisma.users.findUniqueOrThrow({ where: { id: user_id } });
            const result = await this.database.findUniqueOrThrow({ where: { id: user.auth_id } });
            return result;
        }
        catch (e) {
            throw new Error(`Error At AuthRepository findByUserId prisma => ${e.message}`);
        }
    }
    async findAuthRolesByAuthId(auth_id) {
        if (auth_id == undefined) {
            throw new Error(`Error At AuthRepository findAuthRolesByAuthId repository: id = ${auth_id}`);
        }
        try {
            const result = await this.prisma.auth_roles.findFirst({ where: { auth_id } });
            return result;
        }
        catch (e) {
            throw new Error(`Error At AuthRepository findAuthRolesByAuthId prisma => ${e.message}`);
        }
    }
    async create({ email, username, password, role_id }) {
        const already_have = await this.findByEmail(email);
        if (already_have != undefined) {
            throw new Error(`O Email ${email} já esta cadastrado no sistema.`);
        }
        try {
            const auth = await this.database.create({ data: {
                    email: email,
                    active: true,
                    username: username,
                    password: password
                } }).catch((e) => {
                throw new Error(`Error at AuthRepository create Prisma=> ${e.message}`);
            });
            await this.prisma.auth_roles.create({ data: { auth_id: auth.id, role_id } });
            return auth;
        }
        catch (e) {
            throw new Error(`Error at AuthRepository create prisma => ${e.message}`);
        }
    }
    async update({ id, email, username, password }) {
        await this.database.update({
            where: { id },
            data: {
                email: email,
                username: username,
                password: password
            }
        }).catch((e) => {
            throw new Error(`Error at AuthRepository update prisma => ${e.message}`);
        });
    }
};
exports.AuthRepository = AuthRepository;
exports.AuthRepository = AuthRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_database_1.PrismaDatabase])
], AuthRepository);
//# sourceMappingURL=auth.repository.js.map