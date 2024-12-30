import { TicketsRepository } from '@/repositories/tickets.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TicketService {

    constructor(
        private ticketRepository: TicketsRepository
    ) {}

    public async findAll(): Promise<any> {
		try {
            await this.ticketRepository.findAll();
		}
		catch (e) {
            throw new Error(`Error at TicketService findAll => ${e.message}`)
		}
    }

    public async findById(id: number): Promise<any> {
		try {
            await this.ticketRepository.findById(id);
		}
		catch (e) {
            throw new Error(`Error at TicketService findById => ${e.message}`)
		}
    }

    public async update(obj: any): Promise<any> {
		try {
                  // await this.ticketRepository.update(obj);
		}
		catch (e) {
            throw new Error(`Error at TicketService update => ${e.message}`)
		}
    }
}
