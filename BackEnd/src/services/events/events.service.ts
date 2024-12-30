import { TicketUserRepository } from '@/repositories/ticket_user.repository';
import { EventsRepository } from '@/repositories/events.repository';
import { Injectable } from '@nestjs/common';
import { LimitTicketEnum } from '@/shared/enums/general.enum';
import { TicketsRepository } from '@/repositories/tickets.repository';

@Injectable()
export class EventService {

      constructor(
            private eventRepository: EventsRepository,
            private ticketsRepository: TicketsRepository,
            private ticketUserRepository: TicketUserRepository
      ) { }

      public async findAll(): Promise<any> {
            try {
                  await this.eventRepository.findAll();
            }
            catch (e) {
                  throw new Error(`Error at EventService findAll => ${e.message}`)
            }
      }

      public async getAllValid(): Promise<any> {
            try {
                  return await this.eventRepository.getAllValid();
            }
            catch (e) {
                  throw new Error(`Error at EventService getAllValid => ${e.message}`)
            }
      }

      public async getUserEventsByUserId(id: number): Promise<any> {
            try {
                  return await this.ticketUserRepository.getUserEventsByUserId(id);
            }
            catch (e) {
                  throw new Error(`Error at EventService getUserEventsByUserId => ${e.message}`)
            }
      }

      // public async findById(id: number): Promise<any> {
      //       try {
      //             await this.eventRepository.findById(id);
      //       }
      //       catch (e) {
      //             throw new Error(`Error at EventService findById => ${e.message}`)
      //       }
      // }

      // public async insert(obj: any): Promise<any> {
      //       try {
      //             await this.eventRepository.create(obj);
      //       }
      //       catch (e) {
      //             throw new Error(`Error at EventService insert => ${e.message}`)
      //       }
      // }

      public async insertUserEvent({purchase_date, ticket_id, user_id }: any): Promise<any> {
            try {
                  const obj = { purchase_date, ticket_id, user_id }
                  const result = await this.ticketUserRepository.findByObj(obj);
                  const typeTicket = await this.ticketsRepository.findById(ticket_id);
                  const condition = await this.ticketUserRepository.checkLimit(ticket_id, typeTicket);
                  if (condition) {
                        if (result != undefined) {
                              await this.ticketUserRepository.update(obj);
                        } 
                        else {
                              await this.ticketUserRepository.create(obj);
                        }
                  }
                  else {
                        throw new Error("Ticket esgotado!")      
                  }
            }
            catch (e) {
                  throw new Error(`Error at EventService insertUserEvent => ${e.message}`)
            }
      }

      // public async update(obj: any): Promise<any> {
      //       try {
      //             await this.eventRepository.update(obj);
      //       }
      //       catch (e) {
      //             throw new Error(`Error at EventService update => ${e.message}`)
      //       }
      // }
}
