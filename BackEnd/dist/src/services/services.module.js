"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesModule = void 0;
const common_1 = require("@nestjs/common");
const general_service_1 = require("./general/general.service");
const _repositories_module_1 = require("../repositories/_repositories.module");
const jwt_utils_1 = require("../shared/utils/jwt.utils");
const cookie_utils_1 = require("../shared/utils/cookie.utils");
const context_interface_1 = require("../shared/interfaces/context.interface");
const general_repository_1 = require("../repositories/general.repository");
const auth_service_1 = require("./auth/auth.service");
const auth_repository_1 = require("../repositories/auth.repository");
const user_service_1 = require("./user/user.service");
const user_repository_1 = require("../repositories/user.repository");
const log_service_1 = require("./log/log.service");
const token_service_1 = require("./token/token.service");
const tickets_service_1 = require("./tickets/tickets.service");
const events_service_1 = require("./events/events.service");
const tickets_repository_1 = require("../repositories/tickets.repository");
const events_repository_1 = require("../repositories/events.repository");
let ServicesModule = class ServicesModule {
};
exports.ServicesModule = ServicesModule;
exports.ServicesModule = ServicesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            _repositories_module_1.RepositoriesModule
        ],
        exports: [
            jwt_utils_1.JwtUtil,
            cookie_utils_1.CookieUtil,
            _repositories_module_1.RepositoriesModule,
            general_service_1.GeneralService,
            auth_service_1.AuthService,
            user_service_1.UserService,
            token_service_1.TokenService,
            log_service_1.LogService,
            tickets_service_1.TicketService,
            events_service_1.EventService
        ],
        providers: [
            jwt_utils_1.JwtUtil,
            cookie_utils_1.CookieUtil,
            token_service_1.TokenService,
            log_service_1.LogService,
            general_service_1.GeneralService,
            {
                provide: context_interface_1.IGeneral,
                useClass: general_repository_1.GeneralRepository,
            },
            auth_service_1.AuthService,
            {
                provide: context_interface_1.IAuth,
                useClass: auth_repository_1.AuthRepository,
            },
            user_service_1.UserService,
            {
                provide: context_interface_1.IUser,
                useClass: user_repository_1.UserRepository,
            },
            tickets_service_1.TicketService,
            {
                provide: context_interface_1.ITicket,
                useClass: tickets_repository_1.TicketsRepository,
            },
            events_service_1.EventService,
            {
                provide: context_interface_1.IEvent,
                useClass: events_repository_1.EventsRepository,
            },
        ]
    })
], ServicesModule);
//# sourceMappingURL=services.module.js.map