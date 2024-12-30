import { TicketUserRepository } from '@/repositories/ticket_user.repository';
import { EventsRepository } from '@/repositories/events.repository';
import { TicketsRepository } from '@/repositories/tickets.repository';
export declare class EventService {
    private eventRepository;
    private ticketsRepository;
    private ticketUserRepository;
    constructor(eventRepository: EventsRepository, ticketsRepository: TicketsRepository, ticketUserRepository: TicketUserRepository);
    findAll(): Promise<any>;
    getAllValid(): Promise<any>;
    getUserEventsByUserId(id: number): Promise<any>;
    insertUserEvent({ purchase_date, ticket_id, user_id }: any): Promise<any>;
}
