"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const controllers_module_1 = require("./controllers/controllers.module");
const providers_1 = require("./middlewares/jwt-token/providers");
const process_1 = require("process");
const log_service_1 = require("./services/log/log.service");
const jwt_token_middleware_1 = require("./middlewares/jwt-token/jwt-token.middleware");
const seed_1 = require("../prisma/seed");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(jwt_token_middleware_1.JwtTokenMiddleware).forRoutes({ path: 'event-tickets/*', method: common_1.RequestMethod.ALL }, { path: 'user/*', method: common_1.RequestMethod.ALL }, { path: 'auth/*', method: common_1.RequestMethod.ALL });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: `.env.${process_1.env.NODE_ENV || 'local'}`
            }),
            controllers_module_1.ControllersModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, log_service_1.LogService, seed_1.SeedingService, ...providers_1.jwt_providers],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map