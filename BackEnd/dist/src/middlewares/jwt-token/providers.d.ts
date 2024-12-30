import { PrismaDatabase } from "@configs/prisma.database";
import { IAuth, IToken } from "@interfaces/context.interface";
import { AuthRepository } from "@repositories/auth.repository";
import { TokenRepository } from "@repositories/token.repository";
import { AuthService } from "@services/auth/auth.service";
import { TokenService } from "@services/token/token.service";
import { CookieUtil } from "@utils/cookie.utils";
import { JwtUtil } from "@utils/jwt.utils";
export declare const jwt_providers: (typeof PrismaDatabase | typeof TokenRepository | typeof JwtUtil | typeof CookieUtil | typeof TokenService | typeof AuthService | {
    provide: typeof IAuth;
    useClass: typeof AuthRepository;
} | {
    provide: typeof IToken;
    useClass: typeof TokenRepository;
})[];
