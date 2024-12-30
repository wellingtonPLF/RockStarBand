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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const jwt_enum_1 = require("../shared/enums/jwt.enum");
const prisma_database_1 = require("../config/prisma.database");
let UserRepository = class UserRepository {
    constructor(prisma) {
        this.prisma = prisma;
        this.database = prisma.users;
    }
    async findAll() {
        try {
            return await this.database.findMany();
        }
        catch (e) {
            throw new Error(`Error At UserRepository findAll prisma => ${e.message}`);
        }
    }
    async findById(user_id) {
        if (user_id == undefined) {
            throw new Error(jwt_enum_1.JwtType.INVALID_USER.toString());
        }
        try {
            const user = await this.database.findUnique({ where: { id: user_id } });
            return user;
        }
        catch (e) {
            throw new Error(`Error At UserRepository findById prisma => ${e.message}`);
        }
    }
    async findByAuthId(auth_id) {
        if (auth_id == undefined) {
            throw new Error(jwt_enum_1.JwtType.INVALID_USER.toString());
        }
        try {
            const user = await this.database.findFirst({ where: { auth_id } });
            return user;
        }
        catch (e) {
            throw new Error(`Error At UserRepository findByAuthId prisma => ${e.message}`);
        }
    }
    async insert({ nickName, phone, bornDate, auth_id }) {
        const user = await this.database.create({
            data: {
                nickName,
                bornDate,
                active: true,
                phone,
                auth_id
            }
        }).catch((e) => {
            throw new Error(`Error at UserRepository insert Prisma=> ${e.message}`);
        });
        return user;
    }
    async update({ id, nickName, active, bornDate, phone, auth_id }) {
        const user = await this.database.update({
            where: { id },
            data: {
                nickName,
                bornDate,
                active,
                phone,
                auth_id
            }
        }).catch((e) => {
            throw new Error(`Error At UserRepository update prisma => ${e.message}`);
        });
        return user;
    }
    async disableUserByAuthId(auth_id) {
        const user = await this.database.updateMany({
            where: { auth_id },
            data: {
                active: false,
            }
        }).catch((e) => {
            throw new Error(`Error At UserRepository disable prisma => ${e.message}`);
        });
        return user;
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_database_1.PrismaDatabase])
], UserRepository);
//# sourceMappingURL=user.repository.js.map