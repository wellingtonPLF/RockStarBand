import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return "Bem-vindo ao super visionary API (version 1.0.0)";
  }
}
