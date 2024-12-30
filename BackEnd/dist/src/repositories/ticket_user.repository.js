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
exports.TicketUserRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_database_1 = require("../config/prisma.database");
const client_1 = require("@prisma/client");
const general_enum_1 = require("../shared/enums/general.enum");
let TicketUserRepository = class TicketUserRepository {
    constructor(prisma) {
        this.prisma = prisma;
        this.database = prisma.ticket_user;
    }
    async findByObj({ ticket_id, user_id, purchase_date }) {
        try {
            const result = await this.database.findUnique({
                where: {
                    ticket_id_user_id_purchase_date: {
                        purchase_date,
                        ticket_id,
                        user_id
                    },
                }
            });
            return result;
        }
        catch (e) {
            throw new Error(`Error At TicketUserRepository findByObj prisma => ${e.message}`);
        }
    }
    async getUserEventsByUserId(user_id) {
        try {
            const rawQuery = `
                SELECT
                    e.id::integer,
                    e.city as local, 
                    tt.description as type,
                    TO_CHAR(tu.purchase_date, 'DD/MM/YYYY') as date_buy,
                    TO_CHAR(e.event_initial_date, 'DD/MM') as date_event_initial,
                    TO_CHAR(e.event_end_date, 'DD/MM/YYYY') as date_event,                      
                    ti.value as value_per_ticket,
                    tu.quantity as qnt
                FROM tickets as ti
                INNER JOIN ticket_type as tt ON tt.id = ti.ticket_type_id
                INNER JOIN events as e ON e.id = ti.event_id
                INNER JOIN ticket_user as tu ON tu.ticket_id = ti.id
                WHERE tu.user_id = ${user_id}
            `;
            const result = await this.prisma.$queryRaw(client_1.Prisma.sql([rawQuery]));
            return result;
        }
        catch (e) {
            throw new Error(`Error At TicketUserRepository getUserEventsByUserId prisma => ${e.message}`);
        }
    }
    async checkLimit(ticket_id, typeTicket) {
        try {
            const { acronym } = typeTicket.ticket_type;
            const result = await this.database.aggregate({
                _sum: {
                    quantity: true
                },
                where: {
                    ticket_id
                },
            });
            return result["_sum"].quantity ? result["_sum"].quantity < parseInt(general_enum_1.LimitTicketEnum[acronym]) : true;
        }
        catch (e) {
            throw new Error(`Error At TicketUserRepository checkLimit prisma => ${e.message}`);
        }
    }
    async create({ ticket_id, user_id, purchase_date }) {
        try {
            const data = {
                ticket_id, user_id, purchase_date, quantity: 1
            };
            const ticket_user = await this.database.create({ data }).catch((e) => {
                throw new Error(`Error at TicketUserRepository create Prisma=> ${e.message}`);
            });
            return ticket_user;
        }
        catch (e) {
            throw new Error(`Error at TicketUserRepository create prisma => ${e.message}`);
        }
    }
    async update({ ticket_id, user_id, purchase_date }) {
        try {
            const ticketUser = await this.findByObj({ ticket_id, user_id, purchase_date });
            const quantity = ticketUser.quantity + 1;
            const events = await this.database.update({
                where: { ticket_id_user_id_purchase_date: { ticket_id, user_id, purchase_date } },
                data: {
                    user_id,
                    purchase_date,
                    quantity
                }
            }).catch((e) => {
                throw new Error(`Error at TicketUserRepository update Prisma=> ${e.message}`);
            });
            return events;
        }
        catch (e) {
            throw new Error(`Error at TicketUserRepository update prisma => ${e.message}`);
        }
    }
};
exports.TicketUserRepository = TicketUserRepository;
exports.TicketUserRepository = TicketUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_database_1.PrismaDatabase])
], TicketUserRepository);
//# sourceMappingURL=ticket_user.repository.js.map