import { AuthService } from '@/services/auth/auth.service';
import { LogService } from '@/services/log/log.service';
import { TokenService } from '@/services/token/token.service';
import { UserService } from '@/services/user/user.service';
import { ErrorEnum } from '@/shared/enums/errors.enum';
import { TokenType } from '@/shared/enums/jwt.enum';
import { AuthData } from '@interfaces/entities/auth.interface';
import { Controller, Get, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private tokenService: TokenService,
        private logService: LogService
    ){}

    @Post('/authentication')
    async authentication (@Req() req: Request, @Res() res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const { username } = await this.authService.authenticate({ email, password }, req, res);
            res.status(201).send({ username, message: "Authentication Done!"})
        }
        catch (e: any) {
            this.logService.error(e)
            let error = e.message.split("=>");
            error = error[error.length - 1].trim()
            const errorType = error == ErrorEnum.userNotFound ? "email" : "password"
            res.status(500).send({error, errorType})
        }
    }
    
    @Get('/isLoggedIn')
    async isLoggedIn (@Req() req: Request, @Res() res: Response): Promise<void> {
        try {
            const result: boolean = await this.authService.isLoggedIn(req);
            res.status(201).json({ isLoggedIn: result})
        }
        catch (e: any) {
            this.logService.error(e)
            res.status(500).send({"error": e.message})
        }
    }
    
    @Post('/acceptAuth')
    async acceptAuth (@Req() req: Request, @Res() res: Response): Promise<void> {
        try {        
            const { email, password } = req.body;
            await this.authService.acceptAuth({ email, password }, req)
            res.status(201).send()  
        } 
        catch (e: any){
            this.logService.error(e)
            res.status(500).send({"error": e.message})
        }
    }
    
    @Post('/')
    async authInsert (@Req() req: Request, @Res() res: Response): Promise<void> {
        try {
            const { email, username, password, roles: role_id, user } = req.body;
            const { id }: AuthData = await this.authService.insert({ email, username, password, role_id})

            const new_user: any = { 
                nickName: username,
                phone: user.phone,
                bornDate: new Date(user.bornDate).toISOString(),
                auth_id: id
            }
            await this.userService.insert(new_user)
            await this.tokenService.genJwtCookie(req, res, id, TokenType.AT_NAME, TokenType.RT_NAME);
            
            res.status(201).json({ message: "Done!"})  
        } 
        catch (e: any){
            this.logService.error(e)
            const error = e.message.split("=>");
            res.status(500).send({"error": error[error.length - 1].trim(), errorType: "email"})
        }
    }
    
    @Put('/')
    async authUpdate (@Req() req: Request, @Res() res: Response): Promise<void> {
        try {
            const { id, email, username, password} = req.body;
            await this.authService.update({ id, email, username, password})
            res.status(201).send()    
        } 
        catch (e: any){
            this.logService.error(e)
            res.status(500).send({"error": e.message})
        }
    }
    
    @Get('/refresh')
    async refresh (@Req() req: Request, @Res() res: Response): Promise<void> {
        try {
            await this.authService.refresh(req, res)
            res.status(201).send()
        }
        catch (e: any) {
            this.logService.error(e)
            res.status(500).send({"error": e.message})
        }
    }
    
    @Get('/logout')
    async logout (@Req() req: Request, @Res() res: Response): Promise<void> {
        try {
            await this.authService.logout(req, res)
            res.status(201).send()
        }
        catch (e) {
            this.logService.error(e)
            res.status(500).send({"error": 'error'})
        }
    }
}
