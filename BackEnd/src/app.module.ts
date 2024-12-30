import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ControllersModule } from './controllers/controllers.module';
import { jwt_providers } from '@middlewares/jwt-token/providers';
import { env } from 'process';
import { LogService } from '@services/log/log.service';
import { JwtTokenMiddleware } from './middlewares/jwt-token/jwt-token.middleware';
import { SeedingService } from 'prisma/seed';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${env.NODE_ENV || 'local'}`
    }),
    ControllersModule
  ],
  controllers: [AppController],
  providers: [AppService, LogService, SeedingService, ...jwt_providers],
}) export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
    
    consumer.apply(JwtTokenMiddleware).forRoutes(
      /* ======================================================================== */
      { path: 'event-tickets/*', method: RequestMethod.ALL },
      { path: 'user/*', method: RequestMethod.ALL },
      { path: 'auth/*', method: RequestMethod.ALL }
      /* ======================================================================== */      
    );
  }
}