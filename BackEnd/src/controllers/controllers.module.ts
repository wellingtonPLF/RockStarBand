import { Module } from '@nestjs/common';
import { GeneralController } from './general/general.controller';
import { ServicesModule } from 'src/services/services.module';
import { AuthController } from './authentication/authentication.controller';
import { UserController } from './user/user.controller';
import { EventTicketsController } from './event-tickets/event-tickets.controller';

@Module({
    imports: [
        ServicesModule
    ],
    controllers: [
        GeneralController,
        AuthController,
        UserController,
        EventTicketsController
    ]
})
export class ControllersModule {}
  