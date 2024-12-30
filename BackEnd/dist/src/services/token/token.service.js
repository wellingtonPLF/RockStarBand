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
exports.TokenService = void 0;
const jwt_enum_1 = require("../../shared/enums/jwt.enum");
const cookie_utils_1 = require("../../shared/utils/cookie.utils");
const jwt_utils_1 = require("../../shared/utils/jwt.utils");
const common_1 = require("@nestjs/common");
const token_repository_1 = require("../../repositories/token.repository");
let TokenService = class TokenService {
    constructor(tokenRepository, jwtUtil, cookieUtil) {
        this.tokenRepository = tokenRepository;
        this.jwtUtil = jwtUtil;
        this.cookieUtil = cookieUtil;
    }
    async genJwtCookie(req, res, auth_id, access_token, refresh_token) {
        const jwtToken = this.jwtUtil.generateToken({ auth_id }, jwt_enum_1.TokenType.ACCESS_TOKEN);
        const refreshToken = this.jwtUtil.generateToken({ auth_id }, jwt_enum_1.TokenType.REFRESH_TOKEN);
        const jwt = { key: jwtToken, auth_id };
        await this.deleteByAuthID(auth_id).catch(() => { });
        await this.insert(jwt);
        this.cookieUtil.create(res, access_token, jwtToken, req.secure, req.hostname);
        this.cookieUtil.create(res, refresh_token, refreshToken, req.secure, req.hostname);
        req.session.token = jwtToken;
        req.session.refresh = refreshToken;
    }
    async findByToken(token) {
        try {
            return await this.tokenRepository.findByToken(token);
        }
        catch (e) {
            throw new Error(`Error at TokenService findByToken => User is not logged! Token Invalido...`);
        }
    }
    async findByAuthID(id) {
        try {
            const tokenDB = await this.tokenRepository.findByAuthId(id);
            return tokenDB;
        }
        catch (e) {
            throw new Error(`Error at TokenService findByAuthID => ${e.message}`);
        }
    }
    async insert(jwt) {
        try {
            await this.tokenRepository.insert(jwt);
        }
        catch (e) {
            throw new Error(`Error at TokenService insert => ${e.message}`);
        }
    }
    async update(jwt) {
        try {
            await this.tokenRepository.update(jwt);
        }
        catch (e) {
            throw new Error(`Error at TokenService update => ${e.message}`);
        }
    }
    async delete(id) {
        try {
            await this.tokenRepository.delete(id);
        }
        catch (e) {
            throw new Error(`Error at TokenService delete => ${e.message}`);
        }
    }
    async deleteByAuthID(auth_id) {
        try {
            await this.tokenRepository.deleteByAuthID(auth_id);
        }
        catch (e) {
            throw new Error(`Error at TokenService deleteByAuthID => ${e.message}`);
        }
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [token_repository_1.TokenRepository,
        jwt_utils_1.JwtUtil,
        cookie_utils_1.CookieUtil])
], TokenService);
//# sourceMappingURL=token.service.js.map