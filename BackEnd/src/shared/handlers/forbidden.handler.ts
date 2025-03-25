import { Catch, ExceptionFilter, ArgumentsHost, ForbiddenException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter implements ExceptionFilter {
  catch(_: ForbiddenException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.FORBIDDEN).send({"error": 'Você não Possui este Acesso!'})
  }
}
