"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoriesModule = void 0;
const common_1 = require("@nestjs/common");
const general_repository_1 = require("./general.repository");
const prisma_database_1 = require("../config/prisma.database");
const token_repository_1 = require("./token.repository");
const user_repository_1 = require("./user.repository");
const auth_repository_1 = require("./auth.repository");
const tickets_repository_1 = require("./tickets.repository");
const events_repository_1 = require("./events.repository");
const ticket_user_repository_1 = require("./ticket_user.repository");
let RepositoriesModule = class RepositoriesModule {
};
exports.RepositoriesModule = RepositoriesModule;
exports.RepositoriesModule = RepositoriesModule = __decorate([
    (0, common_1.Module)({
        exports: [
            prisma_database_1.PrismaDatabase,
            token_repository_1.TokenRepository,
            user_repository_1.UserRepository,
            auth_repository_1.AuthRepository,
            general_repository_1.GeneralRepository,
            tickets_repository_1.TicketsRepository,
            events_repository_1.EventsRepository,
            ticket_user_repository_1.TicketUserRepository
        ],
        providers: [
            prisma_database_1.PrismaDatabase,
            token_repository_1.TokenRepository,
            user_repository_1.UserRepository,
            auth_repository_1.AuthRepository,
            general_repository_1.GeneralRepository,
            tickets_repository_1.TicketsRepository,
            events_repository_1.EventsRepository,
            ticket_user_repository_1.TicketUserRepository
        ]
    })
], RepositoriesModule);
//# sourceMappingURL=_repositories.module.js.map