import { WinstonModule } from "nest-winston";
import { format, transports } from 'winston';

export const logger = WinstonModule.createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple(),
      ),
    }),
    new transports.File({
      filename: 'combined.log',
      format: format.simple(),
    }),
  ],
});
