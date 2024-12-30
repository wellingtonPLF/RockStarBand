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
exports.GeneralController = void 0;
const common_1 = require("@nestjs/common");
let GeneralController = class GeneralController {
    async getSomething(req, res) {
        try {
            res.status(201).send({ obj: "OK" });
        }
        catch (err) {
            res.status(500).send({ error: err.message });
        }
    }
};
exports.GeneralController = GeneralController;
__decorate([
    (0, common_1.Get)('/anything'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GeneralController.prototype, "getSomething", null);
exports.GeneralController = GeneralController = __decorate([
    (0, common_1.Controller)('general')
], GeneralController);
//# sourceMappingURL=general.controller.js.map