import { Test, TestingModule } from '@nestjs/testing';
import { EventTicketsController } from './event-tickets.controller';

describe('EventTicketsController', () => {
  let controller: EventTicketsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventTicketsController],
    }).compile();

    controller = module.get<EventTicketsController>(EventTicketsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
