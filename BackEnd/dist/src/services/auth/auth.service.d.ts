import { Request, Response } from 'express';
import { IAuth } from '@interfaces/context.interface';
import { JwtUtil } from '@utils/jwt.utils';
import { TokenService } from '@services/token/token.service';
import { CookieUtil } from '@utils/cookie.utils';
export declare class AuthService {
    private authRepository;
    private tokenService;
    private jwtUtil;
    private cookieUtil;
    private accessTokenName;
    private refreshTokenName;
    private salts;
    constructor(authRepository: IAuth, tokenService: TokenService, jwtUtil: JwtUtil, cookieUtil: CookieUtil);
    authenticate(auth: any, req: Request, res: Response): Promise<any>;
    refresh(req: Request, res: Response): Promise<any>;
    recover(_email: string): Promise<any>;
    logout(req: Request, res: Response): Promise<any>;
    getAuthenticatedRole(request: Request): Promise<number>;
    getAuthValidation(auth_id: number, req: Request): Promise<any>;
    isLoggedIn(request: Request): Promise<boolean>;
    acceptAuth({ id, password }: any, req: Request): Promise<any>;
    findAuthRolesByAuthId(auth_id: number): Promise<{
        role_id: number;
    }>;
    findById(id: number): Promise<any>;
    findByUserID(user_id: number, req?: Request): Promise<any>;
    insert({ email, username, password, role_id }: any): Promise<any>;
    update(auth: any): Promise<any>;
}
