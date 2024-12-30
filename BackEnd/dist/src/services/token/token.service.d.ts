import { CookieUtil } from '@/shared/utils/cookie.utils';
import { JwtUtil } from '@/shared/utils/jwt.utils';
import { TokenRepository } from '@repositories/token.repository';
import { Request, Response } from 'express';
export declare class TokenService {
    private tokenRepository;
    private jwtUtil;
    private cookieUtil;
    constructor(tokenRepository: TokenRepository, jwtUtil: JwtUtil, cookieUtil: CookieUtil);
    genJwtCookie(req: Request, res: Response, auth_id: number, access_token: string, refresh_token: string): Promise<any>;
    findByToken(token: string): Promise<any>;
    findByAuthID(id: number): Promise<any>;
    insert(jwt: any): Promise<void>;
    update(jwt: any): Promise<void>;
    delete(id: number): Promise<void>;
    deleteByAuthID(auth_id: number): Promise<void>;
}
