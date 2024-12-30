import { Module } from '@nestjs/common';
import { GeneralRepository } from './general.repository';
import { PrismaDatabase } from '@configs/prisma.database';
import { TokenRepository } from './token.repository';
import { UserRepository } from './user.repository';
import { AuthRepository } from './auth.repository';
import { LogService } from '@/services/log/log.service';
import { TicketsRepository } from './tickets.repository';
import { EventsRepository } from './events.repository';
import { TicketUserRepository } from './ticket_user.repository';

@Module({
    exports: [
        PrismaDatabase,
        TokenRepository,
        UserRepository,
        AuthRepository,
        GeneralRepository,
        TicketsRepository,
        EventsRepository,
        TicketUserRepository
        // LogService
    ],
    providers: [
        // LogService,
        PrismaDatabase,
        TokenRepository,
        UserRepository,
        AuthRepository,
        GeneralRepository,
        TicketsRepository,
        EventsRepository,
        TicketUserRepository
    ]
})
export class RepositoriesModule {}
  