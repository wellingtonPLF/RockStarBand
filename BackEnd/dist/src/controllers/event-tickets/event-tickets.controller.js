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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventTicketsController = void 0;
const events_service_1 = require("../../services/events/events.service");
const log_service_1 = require("../../services/log/log.service");
const user_service_1 = require("../../services/user/user.service");
const common_1 = require("@nestjs/common");
let EventTicketsController = class EventTicketsController {
    constructor(userService, logService, eventService) {
        this.userService = userService;
        this.logService = logService;
        this.eventService = eventService;
    }
    async getAllEvents(req, res) {
        try {
            const events = await this.eventService.getAllValid();
            res.status(201).send({ data: events });
        }
        catch (e) {
            this.logService.error(e);
            res.status(500).send({ "error": e.message });
        }
    }
    async getUserEvents(req, res) {
        try {
            const { id } = await this.userService.getAuthenticatedUser(req);
            const events = await this.eventService.getUserEventsByUserId(id);
            res.status(201).send({ data: events });
        }
        catch (e) {
            this.logService.error(e);
            res.status(500).send({ "error": e.message });
        }
    }
    async insertEventTicket(req, res, { ticket_id }) {
        try {
            const { id } = await this.userService.getAuthenticatedUser(req);
            const obj = {
                ticket_id,
                user_id: id,
                purchase_date: new Date()
            };
            await this.eventService.insertUserEvent(obj);
            res.status(201).send({ message: "Done!" });
        }
        catch (e) {
            this.logService.error(e);
            res.status(500).send({ error: e.message });
        }
    }
};
exports.EventTicketsController = EventTicketsController;
__decorate([
    (0, common_1.Get)('/getAllEvents'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EventTicketsController.prototype, "getAllEvents", null);
__decorate([
    (0, common_1.Get)('/getUserEvents'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EventTicketsController.prototype, "getUserEvents", null);
__decorate([
    (0, common_1.Post)('/insertEventTicket'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], EventTicketsController.prototype, "insertEventTicket", null);
exports.EventTicketsController = EventTicketsController = __decorate([
    (0, common_1.Controller)('event-tickets'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        log_service_1.LogService,
        events_service_1.EventService])
], EventTicketsController);
//# sourceMappingURL=event-tickets.controller.js.map