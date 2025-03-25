import { UserService } from '@/services/user/user.service';
import { Controller, Delete, Get, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService
    ){}

    @Get('/')
    async listUsers (@Req() req: Request, @Res() res: Response): Promise<void> {
        try {
            const users = await this.userService.findAll()
            res.status(201).json({data: users})
        }
        catch (e: any) {
            res.status(500).send({"error": e.message})
        }
    }

    @Get('/getUser') 
    async getUser (@Req() req: Request, @Res() res: Response): Promise<void> {
        try {
            const user = await this.userService.getAuthenticatedUser(req);
            res.status(201).json({data: user})
        }
        catch (e: any) {
            res.status(500).send({"error": e.message})
        }
    }

    @Post('') 
    async createUser (@Req() req: Request, @Res() res: Response): Promise<void> {
        const { nickName, bornDate, auth } = req.body;
        
        try {        
            await this.userService.insert({ nickName, bornDate, auth })
            res.status(201).send()  
        } 
        catch (e: any){
            res.status(500).send({"error": e.message})
        }
    }

    @Put('') 
    async updateUser (@Req() req: Request, @Res() res: Response): Promise<void> {
        const { id, nickName, bornDate, auth } = req.body;
        
        try {
            const result = await this.userService.update({ id, nickName, bornDate, auth })
            res.status(201).json({data: result})    
        } 
        catch (e: any){
            res.status(500).send({"error": e.message})
        }
    }

    @Delete('/:id') 
    async deleteUser (@Req() req: Request, @Res() res: Response): Promise<void> {
        try {
            const userId = req.params.id;        
            await this.userService.disable(parseInt(userId), req);
            res.status(201).send()
        }
        catch (e: any) {
            res.status(500).send({"error": e.message})
        }
    }
}