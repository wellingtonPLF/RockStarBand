import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '@services/auth/auth.service';
import { CookieUtil } from '@utils/cookie.utils';
import { TokenType } from '@enums/jwt.enum';
import { UserService } from '@/services/user/user.service';

@Injectable()
export class JwtTokenMiddleware implements NestMiddleware {

  constructor(
    private authService: AuthService, 
    private cookieUtil: CookieUtil,
    private userService: UserService
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    console.log("Request: ", req.originalUrl)

    const token = await this.authService.refresh(req, res).catch((e) => {
        return false;
    });

    req.session.token = token ? token : this.cookieUtil.getCookieValue(req, TokenType.AT_NAME);

    try {
      if (token) {
        const user: any = await this.userService.getAuthenticatedUser(req)
        if (user == undefined) {
          throw new Error(`Data doesn't exist on Table users`)
        }
        res.locals.role = user.role;
      }
    } catch(e) {
      res.locals.role = 0;
      console.log(e)
    }
    next();
  }
}
