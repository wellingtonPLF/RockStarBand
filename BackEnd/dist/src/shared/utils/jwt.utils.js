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
exports.JwtUtil = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_enum_1 = require("../enums/jwt.enum");
const common_1 = require("@nestjs/common");
const process_1 = require("process");
const random_key_utils_1 = require("./random-key.utils");
let JwtUtil = class JwtUtil {
    constructor() {
        this.SECRET_KEY = (0, random_key_utils_1.generateKey)(process_1.env.JWT_SECRET);
    }
    generateToken({ auth_id }, type) {
        const currentTime = Math.floor(Date.now() / 1000);
        const payload = {
            sub: auth_id,
            iat: currentTime,
            exp: currentTime + 60 * 60 * type
        };
        return jsonwebtoken_1.default.sign(payload, this.SECRET_KEY);
    }
    extractSubject(key) {
        try {
            return this.extractClaim(key, "sub");
        }
        catch (_) {
            throw new Error(jwt_enum_1.JwtType.EXPIRED_AT.toString());
        }
    }
    extractClaim(token, claim) {
        const claims = this.extractAllClaims(token);
        return claims[claim];
    }
    extractAllClaims(token) {
        return jsonwebtoken_1.default.verify(token, this.SECRET_KEY);
    }
};
exports.JwtUtil = JwtUtil;
exports.JwtUtil = JwtUtil = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], JwtUtil);
//# sourceMappingURL=jwt.utils.js.map