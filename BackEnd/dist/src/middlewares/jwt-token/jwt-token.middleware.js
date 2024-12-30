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
exports.JwtTokenMiddleware = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../../services/auth/auth.service");
const cookie_utils_1 = require("../../shared/utils/cookie.utils");
const jwt_enum_1 = require("../../shared/enums/jwt.enum");
let JwtTokenMiddleware = class JwtTokenMiddleware {
    constructor(authService, cookieUtil) {
        this.authService = authService;
        this.cookieUtil = cookieUtil;
    }
    async use(req, res, next) {
        console.log("Request: ", req.originalUrl);
        const token = await this.authService.refresh(req, res).catch((e) => {
            return false;
        });
        req.session.token = token ? token : this.cookieUtil.getCookieValue(req, jwt_enum_1.TokenType.AT_NAME);
        next();
    }
};
exports.JwtTokenMiddleware = JwtTokenMiddleware;
exports.JwtTokenMiddleware = JwtTokenMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        cookie_utils_1.CookieUtil])
], JwtTokenMiddleware);
//# sourceMappingURL=jwt-token.middleware.js.map