import { PrismaDatabase } from "@configs/prisma.database";
import { IAuth, IToken } from "@interfaces/context.interface";
import { AuthRepository } from "@repositories/auth.repository";
import { TokenRepository } from "@repositories/token.repository";
import { AuthService } from "@services/auth/auth.service";
import { TokenService } from "@services/token/token.service";
import { CookieUtil } from "@utils/cookie.utils";
import { JwtUtil } from "@utils/jwt.utils";

export const jwt_providers = [
    TokenRepository,
    PrismaDatabase,
    JwtUtil,
    CookieUtil,
    AuthService,
    {
        provide: IAuth,
        useClass: AuthRepository
    },
    TokenService,
    {
        provide: IToken,
        useClass: TokenRepository
    }
]