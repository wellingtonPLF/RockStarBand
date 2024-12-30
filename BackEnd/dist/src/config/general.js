"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
exports.logger = nest_winston_1.WinstonModule.createLogger({
    transports: [
        new winston_1.transports.Console({
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple()),
        }),
        new winston_1.transports.File({
            filename: 'combined.log',
            format: winston_1.format.simple(),
        }),
    ],
});
//# sourceMappingURL=general.js.map