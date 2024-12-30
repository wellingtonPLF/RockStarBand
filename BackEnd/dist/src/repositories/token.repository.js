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
exports.TokenRepository = void 0;
const prisma_database_1 = require("../config/prisma.database");
const jwt_enum_1 = require("../shared/enums/jwt.enum");
const common_1 = require("@nestjs/common");
let TokenRepository = class TokenRepository {
    constructor(prisma) {
        this.prisma = prisma;
        this.database = prisma.tokens;
    }
    async findByToken(token) {
        if (token == undefined) {
            throw new Error(`Error At TokenRepository findByToken repository: token = ${token}`);
        }
        try {
            const result = await this.database.findFirstOrThrow({ where: { key: token } });
            return result;
        }
        catch (_) {
            throw new Error(jwt_enum_1.JwtType.INVALID_AT);
        }
    }
    async findByAuthId(auth_id) {
        if (auth_id == undefined) {
            throw new Error(`Error At TokenRepository findByAuthId repository: id = ${auth_id}`);
        }
        try {
            const result = await this.database.findFirstOrThrow({ where: { auth_id } });
            return result[0];
        }
        catch (_) {
            throw new Error(jwt_enum_1.JwtType.INVALID_AT);
        }
    }
    async insert({ key, auth_id }) {
        await this.database.create({ data: {
                key,
                auth_id
            } }).catch((e) => {
            throw new Error(`Error At TokenRepository create query => ${e.message}`);
        });
    }
    async update({ id, key, auth_id }) {
        await this.database.update({ where: { id }, data: {
                id,
                key,
                auth_id,
            } }).catch((e) => {
            throw new Error(`Error At TokenRepository update query => ${e.message}`);
        });
    }
    async delete(id) {
        if (id == undefined) {
            throw new Error(`Error At TokenRepository delete repository: id = ${id}`);
        }
        await this.database.delete({ where: { id } }).catch(() => {
            throw new Error("Error at TokenRepository delete query => Can't delete user.");
        });
    }
    async deleteByAuthID(auth_id) {
        if (auth_id == undefined) {
            throw new Error(`Error At TokenRepository deleteByAuthID repository: id = ${auth_id}`);
        }
        await this.database.deleteMany({ where: { auth_id } }).catch(() => {
            throw new Error("Error at TokenRepository deleteByAuthID query => Can't delete user by auth_id.");
        });
    }
};
exports.TokenRepository = TokenRepository;
exports.TokenRepository = TokenRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_database_1.PrismaDatabase])
], TokenRepository);
//# sourceMappingURL=token.repository.js.map