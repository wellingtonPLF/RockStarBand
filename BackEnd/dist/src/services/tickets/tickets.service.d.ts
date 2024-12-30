import { TicketsRepository } from '@/repositories/tickets.repository';
export declare class TicketService {
    private ticketRepository;
    constructor(ticketRepository: TicketsRepository);
    findAll(): Promise<any>;
    findById(id: number): Promise<any>;
    update(obj: any): Promise<any>;
}
