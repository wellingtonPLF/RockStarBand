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
exports.SeedingService = void 0;
const client_1 = require("@prisma/client");
const prisma_database_1 = require("../src/config/prisma.database");
const UserSeed_1 = require("../src/seeds/UserSeed");
const AuthSeed_1 = require("../src/seeds/AuthSeed");
const RoleSeed_1 = require("../src/seeds/RoleSeed");
const EventSeed_1 = require("../src/seeds/EventSeed");
const TicketSeed_1 = require("../src/seeds/TicketSeed");
const TicketSeed_2 = require("../src/seeds/TicketSeed");
const Auth_RoleSeed_1 = require("../src/seeds/Auth_RoleSeed");
const CheckSeed_1 = require("../src/seeds/CheckSeed");
const common_1 = require("@nestjs/common");
let SeedingService = class SeedingService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async onModuleInit() {
        await this.seed();
    }
    async applySequenceQuery(tableName, idName) {
        const rawQuerySequence = `SELECT pg_get_serial_sequence('${tableName}', '${idName}');`;
        const result = await this.prisma.$queryRaw(client_1.Prisma.sql([rawQuerySequence]));
        const rawQuery = `ALTER SEQUENCE ${result[0].pg_get_serial_sequence} RESTART WITH 4;`;
        await this.prisma.$queryRaw(client_1.Prisma.sql([rawQuery]));
    }
    async seed() {
        const roles = RoleSeed_1.roleSeed;
        const users = UserSeed_1.userSeed;
        const authentications = AuthSeed_1.authSeed;
        const authRoles = Auth_RoleSeed_1.authRoleSeed;
        const tickets = TicketSeed_1.ticketSeed;
        const ticket_types = TicketSeed_2.ticketTypeSeed;
        const events = (0, EventSeed_1.eventSeed)();
        try {
            await this.prisma.roles.createMany({
                data: await CheckSeed_1.CheckSeed.simpleCheck(roles, this.prisma.roles),
            });
            await this.prisma.auths.createMany({
                data: await CheckSeed_1.CheckSeed.simpleCheck(authentications, this.prisma.auths),
            });
            await this.prisma.auth_roles.createMany({
                data: await CheckSeed_1.CheckSeed.authRolesCheck(authRoles, this.prisma.auth_roles),
            });
            await this.prisma.users.createMany({
                data: await CheckSeed_1.CheckSeed.simpleCheck(users, this.prisma.users),
            });
            await this.prisma.ticket_type.createMany({
                data: await CheckSeed_1.CheckSeed.simpleCheck(ticket_types, this.prisma.ticket_type),
            });
            await this.prisma.tickets.createMany({
                data: await CheckSeed_1.CheckSeed.simpleCheck(tickets, this.prisma.tickets),
            });
            await this.prisma.events.createMany({
                data: await CheckSeed_1.CheckSeed.simpleCheck(events, this.prisma.events),
            });
            const rawQuerySequence = `SELECT count(*) FROM users;`;
            const result = await this.prisma.$queryRaw(client_1.Prisma.sql([rawQuerySequence]));
            if (result[0].count == 3) {
                await this.applySequenceQuery('auths', 'auth_id');
                await this.applySequenceQuery('users', 'user_id');
            }
            console.log('Seeding completed successfully');
        }
        catch (error) {
            console.error('Error during seeding:', error);
            throw error;
        }
    }
};
exports.SeedingService = SeedingService;
exports.SeedingService = SeedingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_database_1.PrismaDatabase])
], SeedingService);
//# sourceMappingURL=seed.js.map