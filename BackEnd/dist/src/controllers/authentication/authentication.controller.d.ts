import { AuthService } from '@/services/auth/auth.service';
import { LogService } from '@/services/log/log.service';
import { TokenService } from '@/services/token/token.service';
import { UserService } from '@/services/user/user.service';
import { Request, Response } from 'express';
export declare class AuthController {
    private authService;
    private userService;
    private tokenService;
    private logService;
    constructor(authService: AuthService, userService: UserService, tokenService: TokenService, logService: LogService);
    authentication(req: Request, res: Response): Promise<void>;
    isLoggedIn(req: Request, res: Response): Promise<void>;
    acceptAuth(req: Request, res: Response): Promise<void>;
    authInsert(req: Request, res: Response): Promise<void>;
    authUpdate(req: Request, res: Response): Promise<void>;
    refresh(req: Request, res: Response): Promise<void>;
    logout(req: Request, res: Response): Promise<void>;
}
