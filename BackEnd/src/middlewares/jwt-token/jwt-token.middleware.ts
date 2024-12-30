import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '@services/auth/auth.service';
import { CookieUtil } from '@utils/cookie.utils';
import { TokenType } from '@enums/jwt.enum';

@Injectable()
export class JwtTokenMiddleware implements NestMiddleware {

  constructor(
    private authService: AuthService, 
    private cookieUtil: CookieUtil
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    console.log("Request: ", req.originalUrl)

    const token = await this.authService.refresh(req, res).catch((e) => {
        return false;
    });

    req.session.token = token ? token : this.cookieUtil.getCookieValue(req, TokenType.AT_NAME);
    next();
  }
}
