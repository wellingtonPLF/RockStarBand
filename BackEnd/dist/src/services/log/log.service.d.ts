import { LoggerService } from '@nestjs/common';
export declare class LogService implements LoggerService {
    private readonly status;
    private readonly logtail;
    constructor();
    log(message: any): void;
    debug(message: any): void;
    warn(error: Error): void;
    error(error: Error): void;
    private formatMessage;
}
