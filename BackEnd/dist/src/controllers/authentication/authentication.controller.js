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
exports.AuthController = void 0;
const auth_service_1 = require("../../services/auth/auth.service");
const log_service_1 = require("../../services/log/log.service");
const token_service_1 = require("../../services/token/token.service");
const user_service_1 = require("../../services/user/user.service");
const errors_enum_1 = require("../../shared/enums/errors.enum");
const jwt_enum_1 = require("../../shared/enums/jwt.enum");
const common_1 = require("@nestjs/common");
let AuthController = class AuthController {
    constructor(authService, userService, tokenService, logService) {
        this.authService = authService;
        this.userService = userService;
        this.tokenService = tokenService;
        this.logService = logService;
    }
    async authentication(req, res) {
        try {
            const { email, password } = req.body;
            const { username } = await this.authService.authenticate({ email, password }, req, res);
            res.status(201).send({ username, message: "Authentication Done!" });
        }
        catch (e) {
            this.logService.error(e);
            let error = e.message.split("=>");
            error = error[error.length - 1].trim();
            const errorType = error == errors_enum_1.ErrorEnum.userNotFound ? "email" : "password";
            res.status(500).send({ error, errorType });
        }
    }
    async isLoggedIn(req, res) {
        try {
            const result = await this.authService.isLoggedIn(req);
            res.status(201).json({ isLoggedIn: result });
        }
        catch (e) {
            this.logService.error(e);
            res.status(500).send({ "error": e.message });
        }
    }
    async acceptAuth(req, res) {
        try {
            const { email, password } = req.body;
            await this.authService.acceptAuth({ email, password }, req);
            res.status(201).send();
        }
        catch (e) {
            this.logService.error(e);
            res.status(500).send({ "error": e.message });
        }
    }
    async authInsert(req, res) {
        try {
            const { email, username, password, roles: role_id, user } = req.body;
            const { id } = await this.authService.insert({ email, username, password, role_id });
            const new_user = {
                nickName: username,
                phone: user.phone,
                bornDate: new Date(user.bornDate).toISOString(),
                auth_id: id
            };
            await this.userService.insert(new_user);
            await this.tokenService.genJwtCookie(req, res, id, jwt_enum_1.TokenType.AT_NAME, jwt_enum_1.TokenType.RT_NAME);
            res.status(201).json({ message: "Done!" });
        }
        catch (e) {
            this.logService.error(e);
            const error = e.message.split("=>");
            res.status(500).send({ "error": error[error.length - 1].trim(), errorType: "email" });
        }
    }
    async authUpdate(req, res) {
        try {
            const { id, email, username, password } = req.body;
            await this.authService.update({ id, email, username, password });
            res.status(201).send();
        }
        catch (e) {
            this.logService.error(e);
            res.status(500).send({ "error": e.message });
        }
    }
    async refresh(req, res) {
        try {
            await this.authService.refresh(req, res);
            res.status(201).send();
        }
        catch (e) {
            this.logService.error(e);
            res.status(500).send({ "error": e.message });
        }
    }
    async logout(req, res) {
        try {
            await this.authService.logout(req, res);
            res.status(201).send();
        }
        catch (e) {
            this.logService.error(e);
            res.status(500).send({ "error": 'error' });
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('/authentication'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "authentication", null);
__decorate([
    (0, common_1.Get)('/isLoggedIn'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "isLoggedIn", null);
__decorate([
    (0, common_1.Post)('/acceptAuth'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "acceptAuth", null);
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "authInsert", null);
__decorate([
    (0, common_1.Put)('/'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "authUpdate", null);
__decorate([
    (0, common_1.Get)('/refresh'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.Get)('/logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService,
        token_service_1.TokenService,
        log_service_1.LogService])
], AuthController);
//# sourceMappingURL=authentication.controller.js.map