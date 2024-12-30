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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const context_interface_1 = require("../../shared/interfaces/context.interface");
const jwt_enum_1 = require("../../shared/enums/jwt.enum");
const jwt_utils_1 = require("../../shared/utils/jwt.utils");
const token_service_1 = require("../token/token.service");
const cookie_utils_1 = require("../../shared/utils/cookie.utils");
const bcrypt_1 = __importDefault(require("bcrypt"));
const errors_enum_1 = require("../../shared/enums/errors.enum");
let AuthService = class AuthService {
    constructor(authRepository, tokenService, jwtUtil, cookieUtil) {
        this.authRepository = authRepository;
        this.tokenService = tokenService;
        this.jwtUtil = jwtUtil;
        this.cookieUtil = cookieUtil;
        this.accessTokenName = jwt_enum_1.TokenType.AT_NAME;
        this.refreshTokenName = jwt_enum_1.TokenType.RT_NAME;
        this.salts = 10;
    }
    async authenticate(auth, req, res) {
        let authDB;
        try {
            if (auth.email != undefined) {
                authDB = await this.authRepository.findByEmail(auth.email);
            }
            else if (auth.username != undefined) {
                authDB = await this.authRepository.findByUsername(auth.username);
            }
            if (authDB == undefined) {
                throw new Error(errors_enum_1.ErrorEnum.userNotFound);
            }
            let valid = await bcrypt_1.default.compare(auth.password, authDB.password);
            if (!valid) {
                throw new Error(errors_enum_1.ErrorEnum.incorrectPwd);
            }
            await this.tokenService.genJwtCookie(req, res, authDB.id, this.accessTokenName, this.refreshTokenName);
            return authDB;
        }
        catch (e) {
            throw new Error(`Error at AuthService authenticate => ${e.message}`);
        }
    }
    async refresh(req, res) {
        const accessToken = this.cookieUtil.getCookieValue(req, this.accessTokenName);
        const jwt = await this.tokenService.findByToken(accessToken);
        let authID;
        try {
            this.jwtUtil.extractSubject(jwt.key);
            return jwt.key;
        }
        catch (_) {
            const refreshToken = this.cookieUtil.getCookieValue(req, this.refreshTokenName);
            if (refreshToken == null) {
                throw new Error(jwt_enum_1.JwtType.INVALID_RT.toString());
            }
            try {
                authID = this.jwtUtil.extractSubject(refreshToken);
            }
            catch (_) {
                throw new Error(jwt_enum_1.JwtType.EXPIRED_RT.toString());
            }
            const jwtData = { auth_id: authID };
            const jwtToken = this.jwtUtil.generateToken(jwtData, jwt_enum_1.TokenType.ACCESS_TOKEN);
            const jwtRefresh = this.jwtUtil.generateToken(jwtData, jwt_enum_1.TokenType.REFRESH_TOKEN);
            jwt.key = jwtToken;
            await this.tokenService.update(jwt);
            this.cookieUtil.create(res, this.accessTokenName, jwtToken, req.secure, req.hostname);
            this.cookieUtil.create(res, this.refreshTokenName, jwtRefresh, req.secure, req.hostname);
            console.log("REFRESH !!!");
            return jwtToken;
        }
    }
    async recover(_email) {
        try {
            const { id } = await this.authRepository.findByEmail(_email);
            const recover = this.jwtUtil.generateToken({ auth_id: id }, jwt_enum_1.TokenType.ACCESS_TOKEN);
            const result = await this.tokenService.findByAuthID(id);
            if (result != undefined) {
                await this.tokenService.update({ id: result.id, key: recover, auth_id: result.auth_id });
            }
            else {
                await this.tokenService.insert({ key: recover, auth_id: id });
            }
            return "Verifique seu Email para salvar uma nova senha.";
        }
        catch (_) {
            throw new Error(`E-mail não está cadastrado.`);
        }
    }
    async logout(req, res) {
        try {
            const jwt = this.cookieUtil.getCookieValue(req, this.accessTokenName);
            const jwtDB = await this.tokenService.findByToken(jwt);
            this.cookieUtil.clear(res, this.accessTokenName);
            this.cookieUtil.clear(res, this.refreshTokenName);
            this.tokenService.delete(jwtDB.id);
        }
        catch (e) {
            throw new Error(`Error at AuthService logout => ${e.message}`);
        }
    }
    async getAuthenticatedRole(request) {
        try {
            const auth_id = this.jwtUtil.extractSubject(request.session.token);
            const { role_id: role } = await this.findAuthRolesByAuthId(parseInt(auth_id));
            return role;
        }
        catch (e) {
            throw new Error(`Error at AuthService GetAuthenticatedRole => ${e.message}`);
        }
    }
    async getAuthValidation(auth_id, req) {
        const accessToken = req.session.token;
        const jwt = await this.tokenService.findByToken(accessToken);
        const authID = this.jwtUtil.extractSubject(jwt.key);
        const { role_id: authenticated_role } = await this.authRepository.findAuthRolesByAuthId(parseInt(authID));
        const { role_id: verifying_role } = await this.authRepository.findAuthRolesByAuthId(auth_id);
        if (parseInt(authID) != auth_id) {
            if (authenticated_role <= verifying_role) {
                throw new Error(jwt_enum_1.JwtType.NOT_AUTHORIZED.toString());
            }
        }
    }
    async isLoggedIn(request) {
        const jwt = this.cookieUtil.getCookieValue(request, this.accessTokenName);
        let jwtDB;
        try {
            jwtDB = await this.tokenService.findByToken(jwt);
        }
        catch (e) {
            return false;
        }
        this.jwtUtil.extractSubject(jwtDB.key);
        return true;
    }
    async acceptAuth({ id, password }, req) {
        try {
            await this.getAuthValidation(id, req);
            const authDB = await this.authRepository.findById(id);
            let valid = await bcrypt_1.default.compare(password, authDB.password);
            if (!valid) {
                throw new Error("Incorrect Email or Password , try again.");
            }
        }
        catch (e) {
            throw new Error(`Error at AuthService acceptAuth => ${e.message}`);
        }
    }
    async findAuthRolesByAuthId(auth_id) {
        try {
            const authRoles = await this.authRepository.findAuthRolesByAuthId(auth_id);
            return authRoles;
        }
        catch (e) {
            throw new Error(`Error at AuthService findAuthRolesByAuthId => ${e.message}`);
        }
    }
    async findById(id) {
        try {
            const user = await this.authRepository.findById(id);
            return user;
        }
        catch (e) {
            throw new Error(`Error at AuthService findById => ${e.message}`);
        }
    }
    async findByUserID(user_id, req) {
        try {
            const user = await this.authRepository.findByUserId(user_id);
            return user;
        }
        catch (e) {
            throw new Error(`Error at AuthService findByUserID => ${e.message}`);
        }
    }
    async insert({ email, username, password, role_id }) {
        try {
            const passwordHash = await bcrypt_1.default.hash(password, this.salts);
            if (email == undefined || email == "") {
                throw new Error("Email inválido!");
            }
            else if (password == undefined || password == "") {
                throw new Error("Senha inválida!");
            }
            const authDB = await this.authRepository.create({ email, username, password: passwordHash, role_id });
            return authDB;
        }
        catch (e) {
            throw new Error(`Error at AuthService insert => ${e.message}`);
        }
    }
    async update(auth) {
        try {
            const authDB = await this.authRepository.findById(auth.id);
            if (auth.password != null) {
                authDB.password = await bcrypt_1.default.hash(auth.password, this.salts);
            }
            if (auth.email != null) {
                authDB.email = auth.email;
            }
            if (auth.username != null) {
                authDB.username = auth.username;
            }
            await this.authRepository.update(authDB);
        }
        catch (e) {
            throw new Error(`Error at AuthService update => ${e.message}`);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [context_interface_1.IAuth,
        token_service_1.TokenService,
        jwt_utils_1.JwtUtil,
        cookie_utils_1.CookieUtil])
], AuthService);
//# sourceMappingURL=auth.service.js.map