import { Injectable, LoggerService } from '@nestjs/common';
import { logger } from '@configs/general';
import { Logtail } from '@logtail/node';
import { env } from 'process';

// @Injectable()
export class LogService implements LoggerService {
  private readonly status: boolean;
  private readonly logtail: Logtail;

  constructor() {
    this.status = env.NODE_ENV == "production";

    if (this.status) {
      this.logtail = new Logtail(env.LOG_KEY);
    }
  }

  log(message: any) {
    if (this.status) {
      this.logtail.info(message);
    }
    logger.log(message);
  }

  debug(message: any) {
    if (this.status) {
      this.logtail.debug(message);
    }
    logger.debug(message);
  }

  warn(error: Error) {
    if (this.status) {
      this.logtail.warn(this.formatMessage(error));
    }
    logger.warn(this.formatMessage(error));
  }

  error(error: Error) {
    if (this.status) {
      this.logtail.error(this.formatMessage(error));
    }
    logger.error(this.formatMessage(error));
  }

  private formatMessage(error: Error): string {
    const stack: Array<string> = error.stack.split('\n')
    const path_error: Array<string> = [];

    stack.shift()    
    stack.pop()
    stack.pop()
    
    for (const e of stack) {
      let r = e.split('(')[0].trim();
      if (stack.indexOf(e) == stack.length - 1) {
        r = r.replace('at', 'from')
      }
      path_error.push(r)
    }
    return `Error ${path_error.join(' ')} => ${error.message}`
  }
}
