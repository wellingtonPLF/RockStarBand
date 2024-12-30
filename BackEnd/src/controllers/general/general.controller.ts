import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('general')
export class GeneralController {

    @Get('/anything')
    async getSomething(@Req() req: Request, @Res() res: Response): Promise<void> {
        try {
            res.status(201).send({ obj: "OK"});
        } catch (err) {
            res.status(500).send({ error: err.message});
        }
    }
}
