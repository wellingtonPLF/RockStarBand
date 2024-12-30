import { Module } from '@nestjs/common';
import { GeneralService } from './general/general.service';
import { RepositoriesModule } from 'src/repositories/_repositories.module';
import { JwtUtil } from '@utils/jwt.utils';
import { CookieUtil } from '@utils/cookie.utils';
import { IAuth, IEvent, IGeneral, ITicket, IUser } from '@interfaces/context.interface';
import { GeneralRepository } from 'src/repositories/general.repository';
import { AuthService } from './auth/auth.service';
import { AuthRepository } from '@/repositories/auth.repository';
import { UserService } from './user/user.service';
import { UserRepository } from '@/repositories/user.repository';
import { LogService } from './log/log.service';
import { TokenService } from './token/token.service';
import { TicketService } from './tickets/tickets.service';
import { EventService } from './events/events.service';
import { TicketsRepository } from '@/repositories/tickets.repository';
import { EventsRepository } from '@/repositories/events.repository';

@Module({
    imports: [
        RepositoriesModule
    ],
    exports: [
        JwtUtil,
        CookieUtil,
        RepositoriesModule,
        GeneralService,
        AuthService,
        UserService,
        TokenService,
        LogService,
        TicketService,
        EventService
    ],
    providers: [
        JwtUtil,
        CookieUtil,
        TokenService,
        LogService,
        GeneralService,
        {
            provide: IGeneral,
            useClass: GeneralRepository,
        },
        AuthService,
        {
            provide: IAuth,
            useClass: AuthRepository,
        },
        UserService,
        {
            provide: IUser,
            useClass: UserRepository,
        },
        TicketService,
        {
            provide: ITicket,
            useClass: TicketsRepository,
        },
        EventService,
        {
            provide: IEvent,
            useClass: EventsRepository,
        },
    ]
})
export class ServicesModule {}
