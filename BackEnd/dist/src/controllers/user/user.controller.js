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
exports.UserController = void 0;
const user_service_1 = require("../../services/user/user.service");
const common_1 = require("@nestjs/common");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async listUsers(req, res) {
        try {
            const users = await this.userService.findAll();
            res.status(201).json({ data: users });
        }
        catch (e) {
            res.status(500).send({ "error": e.message });
        }
    }
    async getUser(req, res) {
        try {
            const user = await this.userService.getAuthenticatedUser(req);
            res.status(201).json({ data: user });
        }
        catch (e) {
            res.status(500).send({ "error": e.message });
        }
    }
    async createUser(req, res) {
        const { nickName, bornDate, auth } = req.body;
        try {
            await this.userService.insert({ nickName, bornDate, auth });
            res.status(201).send();
        }
        catch (e) {
            res.status(500).send({ "error": e.message });
        }
    }
    async updateUser(req, res) {
        const { id, nickName, bornDate, auth } = req.body;
        try {
            const result = await this.userService.update({ id, nickName, bornDate, auth });
            res.status(201).json({ data: result });
        }
        catch (e) {
            res.status(500).send({ "error": e.message });
        }
    }
    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            await this.userService.disable(parseInt(userId), req);
            res.status(201).send();
        }
        catch (e) {
            res.status(500).send({ "error": e.message });
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "listUsers", null);
__decorate([
    (0, common_1.Get)('/getUser'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Put)(''),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map