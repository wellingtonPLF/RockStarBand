"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogService = void 0;
const general_1 = require("../../config/general");
const node_1 = require("@logtail/node");
const process_1 = require("process");
class LogService {
    constructor() {
        this.status = process_1.env.NODE_ENV == "production";
        if (this.status) {
            this.logtail = new node_1.Logtail(process_1.env.LOG_KEY);
        }
    }
    log(message) {
        if (this.status) {
            this.logtail.info(message);
        }
        general_1.logger.log(message);
    }
    debug(message) {
        if (this.status) {
            this.logtail.debug(message);
        }
        general_1.logger.debug(message);
    }
    warn(error) {
        if (this.status) {
            this.logtail.warn(this.formatMessage(error));
        }
        general_1.logger.warn(this.formatMessage(error));
    }
    error(error) {
        if (this.status) {
            this.logtail.error(this.formatMessage(error));
        }
        general_1.logger.error(this.formatMessage(error));
    }
    formatMessage(error) {
        const stack = error.stack.split('\n');
        const path_error = [];
        stack.shift();
        stack.pop();
        stack.pop();
        for (const e of stack) {
            let r = e.split('(')[0].trim();
            if (stack.indexOf(e) == stack.length - 1) {
                r = r.replace('at', 'from');
            }
            path_error.push(r);
        }
        return `Error ${path_error.join(' ')} => ${error.message}`;
    }
}
exports.LogService = LogService;
//# sourceMappingURL=log.service.js.map