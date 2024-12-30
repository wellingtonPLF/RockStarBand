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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const context_interface_1 = require("../../shared/interfaces/context.interface");
const token_service_1 = require("../token/token.service");
const auth_service_1 = require("../auth/auth.service");
const jwt_utils_1 = require("../../shared/utils/jwt.utils");
const jwt_enum_1 = require("../../shared/enums/jwt.enum");
let UserService = class UserService {
    constructor(userRepository, tokenService, authService, jwtUtil) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
        this.authService = authService;
        this.jwtUtil = jwtUtil;
    }
    async findAll() {
        try {
            const userDB = await this.userRepository.findAll();
            if (userDB == undefined) {
                return [];
            }
            else {
                return await Promise.all(userDB.map(async (user) => {
                    const authDB = await this.authService.findById(user.auth_id);
                    return {
                        id: userDB.id,
                        bornDate: userDB.bornDate,
                        nickName: userDB.nickName,
                        email: authDB.email,
                        active: userDB.active,
                        phone: userDB.phone,
                        auth_id: userDB.auth_id
                    };
                }));
            }
        }
        catch (e) {
            throw new Error(`Error at UserService findAll => ${e.message}`);
        }
    }
    async findById(id) {
        try {
            const userDB = await this.userRepository.findById(id);
            const authDB = await this.authService.findById(parseInt(userDB.auth_id));
            return {
                id: userDB.id,
                bornDate: userDB.bornDate,
                nickName: userDB.nickName,
                email: authDB.email,
                active: userDB.active,
                phone: userDB.phone,
                auth_id: userDB.auth_id,
            };
        }
        catch (e) {
            throw new Error(`Error at UserService findById => ${e.message}`);
        }
    }
    async getAuthenticatedUser(request) {
        try {
            const accessToken = request.session.token;
            const jwt = await this.tokenService.findByToken(accessToken);
            const authID = this.jwtUtil.extractSubject(jwt.key);
            const authDB = await this.authService.findById(parseInt(authID));
            const userDB = await this.userRepository.findByAuthId(authDB.id);
            const user = {
                id: userDB.id,
                bornDate: userDB.bornDate,
                nickName: userDB.nickName,
                email: authDB.email,
                active: userDB.active,
                phone: userDB.phone,
                auth_id: userDB.auth_id,
            };
            return user;
        }
        catch (e) {
            throw new Error(`Error at UserService GetAuthenticatedUser => ${e.message}`);
        }
    }
    async insert({ nickName, phone, bornDate, auth_id }) {
        try {
            const userDB = await this.userRepository.insert({ nickName, phone, bornDate, auth_id });
            const authDB = await this.authService.findByUserID(userDB.id);
            const result = {
                id: userDB.id,
                bornDate: userDB.bornDate,
                nickName: userDB.nickName,
                email: authDB.email,
                ativo: userDB.ativo,
                phone: userDB.phone,
                auth_id: userDB.auth_id,
            };
            return result;
        }
        catch (e) {
            throw new Error(`Error at UserService insert => ${e.message}`);
        }
    }
    async update(user) {
        try {
            if (user == null) {
                throw new Error(jwt_enum_1.JwtType.INVALID_USER.toString());
            }
            return await this.userRepository.update(user);
        }
        catch (e) {
            throw new Error(`Error at UserService update => ${e.message}`);
        }
    }
    async disable(id, request) {
        try {
            if (id == null) {
                throw new Error("UserId is null");
            }
            await this.authService.getAuthValidation(id, request);
            await this.userRepository.disableUserByAuthId(id);
        }
        catch (e) {
            throw new Error(`Error at UserService disable => ${e.message}`);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [context_interface_1.IUser,
        token_service_1.TokenService,
        auth_service_1.AuthService,
        jwt_utils_1.JwtUtil])
], UserService);
//# sourceMappingURL=user.service.js.map