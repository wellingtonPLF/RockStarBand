"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidLengthException = void 0;
const common_1 = require("@nestjs/common");
const general_exception_1 = require("./general.exception");
class InvalidLengthException extends general_exception_1.CustomException {
    constructor() {
        super('Error: invalid length.', common_1.HttpStatus.NOT_FOUND);
    }
}
exports.InvalidLengthException = InvalidLengthException;
//# sourceMappingURL=invalid-length.exception.js.map