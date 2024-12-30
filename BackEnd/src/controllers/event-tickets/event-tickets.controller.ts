import { EventService } from '@/services/events/events.service';
import { LogService } from '@/services/log/log.service';
import { UserService } from '@/services/user/user.service';
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('event-tickets')
export class EventTicketsController {

    constructor(
        private userService: UserService,
        private logService: LogService,
        private eventService: EventService
    ){}

    @Get('/getAllEvents')
    async getAllEvents(@Req() req: Request, @Res() res: Response): Promise<void> {
        try {
            const events = await this.eventService.getAllValid();
            res.status(201).send({ data: events })
        }
        catch (e: any) {
            this.logService.error(e)
            res.status(500).send({"error": e.message})
        }
    }

    @Get('/getUserEvents')
    async getUserEvents(@Req() req: Request, @Res() res: Response): Promise<void> {
        try {
            const { id } = await this.userService.getAuthenticatedUser(req);
            const events = await this.eventService.getUserEventsByUserId(id);
            res.status(201).send({ data: events })
        }
        catch (e: any) {
            this.logService.error(e)
            res.status(500).send({"error": e.message})
        }
    }

    @Post('/insertEventTicket')
    async insertEventTicket(@Req() req: Request, @Res() res: Response, @Body() { ticket_id }:any): Promise<void> {
        try {
            const { id } = await this.userService.getAuthenticatedUser(req);
            const obj = {
                ticket_id,
                user_id: id, 
                purchase_date: new Date()
            }
            await this.eventService.insertUserEvent(obj);
            res.status(201).send({ message: "Done!"})
        }
        catch (e: any) {
            this.logService.error(e)
            res.status(500).send({ error: e.message })
        }
    }
}
