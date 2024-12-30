"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwt_providers = void 0;
const prisma_database_1 = require("../../config/prisma.database");
const context_interface_1 = require("../../shared/interfaces/context.interface");
const auth_repository_1 = require("../../repositories/auth.repository");
const token_repository_1 = require("../../repositories/token.repository");
const auth_service_1 = require("../../services/auth/auth.service");
const token_service_1 = require("../../services/token/token.service");
const cookie_utils_1 = require("../../shared/utils/cookie.utils");
const jwt_utils_1 = require("../../shared/utils/jwt.utils");
exports.jwt_providers = [
    token_repository_1.TokenRepository,
    prisma_database_1.PrismaDatabase,
    jwt_utils_1.JwtUtil,
    cookie_utils_1.CookieUtil,
    auth_service_1.AuthService,
    {
        provide: context_interface_1.IAuth,
        useClass: auth_repository_1.AuthRepository
    },
    token_service_1.TokenService,
    {
        provide: context_interface_1.IToken,
        useClass: token_repository_1.TokenRepository
    }
];
//# sourceMappingURL=providers.js.map