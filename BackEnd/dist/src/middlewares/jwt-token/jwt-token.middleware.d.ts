import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '@services/auth/auth.service';
import { CookieUtil } from '@utils/cookie.utils';
export declare class JwtTokenMiddleware implements NestMiddleware {
    private authService;
    private cookieUtil;
    constructor(authService: AuthService, cookieUtil: CookieUtil);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
