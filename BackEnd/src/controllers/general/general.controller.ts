import { Roles } from '@/shared/decorators/role.decorator';
import { RoleEnum } from '@/shared/enums/role.enum';
import { RolesGuard } from '@/shared/guards/roles/roles.guard';
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('general')
@UseGuards(RolesGuard)
export class GeneralController {

    @Get('/anything')
    async getSomething(@Req() req: Request, @Res() res: Response): Promise<void> {
        try {
            res.status(201).send({ obj: "OK"});
        } catch (err) {
            res.status(500).send({ error: err.message});
        }
    }

    @Get('/rolesTest')
    @Roles(RoleEnum.ROLE_ADMIN)
    async rolesTest(@Res() res: Response): Promise<void> {
        try {
            res.status(201).send({ obj: "OK"});
        } catch (err) {
            res.status(500).send({ error: err.message});
        }
    }
}
