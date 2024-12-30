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
exports.EventsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_database_1 = require("../config/prisma.database");
const client_1 = require("@prisma/client");
const general_enum_1 = require("../shared/enums/general.enum");
let EventsRepository = class EventsRepository {
    constructor(prisma) {
        this.prisma = prisma;
        this.database = prisma.events;
    }
    async findAll() {
        try {
            const result = await this.database.findMany();
            return result;
        }
        catch (e) {
            throw new Error(`Error At EventsRepository findAll prisma => ${e.message}`);
        }
    }
    async getAllValid() {
        try {
            const rawQuery = `
                SELECT 
                    e.id::integer,
                    TO_CHAR(e.event_initial_date, 'DD') AS day,
                    TO_CHAR(e.event_initial_date, 'FMMonth') AS month,
                    TO_CHAR(e.event_initial_date, 'FMDay') AS weekday,
                    TO_CHAR(e.event_initial_date, 'YYYY') AS year,	
                    e.location, 
                    e.city, 
                    c.country_name as country,
                    nt.normal, 
                    nt.fan, 
                    nt.vip
                FROM events AS e
                JOIN countries as c ON c.acronym = e.country
                LEFT JOIN (
                    WITH numbered_tickets AS (
                      SELECT 
                          id,
                          event_id,
                          ROW_NUMBER() OVER (PARTITION BY event_id ORDER BY id) AS row_num
                      FROM tickets
                  )
                  SELECT
                      nt.event_id,
                      MAX(CASE 
                          WHEN nt.row_num = 1 AND tu.quantity = ${general_enum_1.LimitTicketEnum.NORMAL}
                          THEN null
                      WHEN nt.row_num = 1
                      THEN nt.id
                          END) AS normal,
                      MAX(CASE 
                          WHEN nt.row_num = 2 AND tu.quantity = ${general_enum_1.LimitTicketEnum.FAN}
                          THEN null
                      WHEN nt.row_num = 2
                      THEN nt.id
                          END) AS fan,
                      MAX(CASE 
                          WHEN nt.row_num = 3 AND tu.quantity = ${general_enum_1.LimitTicketEnum.VIP}
                          THEN null
                      WHEN nt.row_num = 3
                      THEN nt.id
                          END) AS vip
                  FROM 
                      numbered_tickets nt
                  LEFT JOIN 
                      ticket_user tu ON nt.id = tu.ticket_id
                  GROUP BY 
                      nt.event_id
                ) AS nt ON nt.event_id = e.id ORDER BY e.id limit 5
            `;
            const result = await this.prisma.$queryRaw(client_1.Prisma.sql([rawQuery]));
            return result;
        }
        catch (e) {
            throw new Error(`Error At EventsRepository findAll prisma => ${e.message}`);
        }
    }
};
exports.EventsRepository = EventsRepository;
exports.EventsRepository = EventsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_database_1.PrismaDatabase])
], EventsRepository);
//# sourceMappingURL=events.repository.js.map