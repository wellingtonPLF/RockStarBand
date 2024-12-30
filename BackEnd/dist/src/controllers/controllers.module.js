"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllersModule = void 0;
const common_1 = require("@nestjs/common");
const general_controller_1 = require("./general/general.controller");
const services_module_1 = require("../services/services.module");
const authentication_controller_1 = require("./authentication/authentication.controller");
const user_controller_1 = require("./user/user.controller");
const event_tickets_controller_1 = require("./event-tickets/event-tickets.controller");
let ControllersModule = class ControllersModule {
};
exports.ControllersModule = ControllersModule;
exports.ControllersModule = ControllersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            services_module_1.ServicesModule
        ],
        controllers: [
            general_controller_1.GeneralController,
            authentication_controller_1.AuthController,
            user_controller_1.UserController,
            event_tickets_controller_1.EventTicketsController
        ]
    })
], ControllersModule);
//# sourceMappingURL=controllers.module.js.map