import { EventService } from '@/services/events/events.service';
import { LogService } from '@/services/log/log.service';
import { UserService } from '@/services/user/user.service';
import { Request, Response } from 'express';
export declare class EventTicketsController {
    private userService;
    private logService;
    private eventService;
    constructor(userService: UserService, logService: LogService, eventService: EventService);
    getAllEvents(req: Request, res: Response): Promise<void>;
    getUserEvents(req: Request, res: Response): Promise<void>;
    insertEventTicket(req: Request, res: Response, { ticket_id }: any): Promise<void>;
}
