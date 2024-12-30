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
exports.EventService = void 0;
const ticket_user_repository_1 = require("../../repositories/ticket_user.repository");
const events_repository_1 = require("../../repositories/events.repository");
const common_1 = require("@nestjs/common");
const tickets_repository_1 = require("../../repositories/tickets.repository");
let EventService = class EventService {
    constructor(eventRepository, ticketsRepository, ticketUserRepository) {
        this.eventRepository = eventRepository;
        this.ticketsRepository = ticketsRepository;
        this.ticketUserRepository = ticketUserRepository;
    }
    async findAll() {
        try {
            await this.eventRepository.findAll();
        }
        catch (e) {
            throw new Error(`Error at EventService findAll => ${e.message}`);
        }
    }
    async getAllValid() {
        try {
            return await this.eventRepository.getAllValid();
        }
        catch (e) {
            throw new Error(`Error at EventService getAllValid => ${e.message}`);
        }
    }
    async getUserEventsByUserId(id) {
        try {
            return await this.ticketUserRepository.getUserEventsByUserId(id);
        }
        catch (e) {
            throw new Error(`Error at EventService getUserEventsByUserId => ${e.message}`);
        }
    }
    async insertUserEvent({ purchase_date, ticket_id, user_id }) {
        try {
            const obj = { purchase_date, ticket_id, user_id };
            const result = await this.ticketUserRepository.findByObj(obj);
            const typeTicket = await this.ticketsRepository.findById(ticket_id);
            const condition = await this.ticketUserRepository.checkLimit(ticket_id, typeTicket);
            if (condition) {
                if (result != undefined) {
                    await this.ticketUserRepository.update(obj);
                }
                else {
                    await this.ticketUserRepository.create(obj);
                }
            }
            else {
                throw new Error("Ticket esgotado!");
            }
        }
        catch (e) {
            throw new Error(`Error at EventService insertUserEvent => ${e.message}`);
        }
    }
};
exports.EventService = EventService;
exports.EventService = EventService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [events_repository_1.EventsRepository,
        tickets_repository_1.TicketsRepository,
        ticket_user_repository_1.TicketUserRepository])
], EventService);
//# sourceMappingURL=events.service.js.map