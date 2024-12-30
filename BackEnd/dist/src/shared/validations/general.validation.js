"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralDescription = void 0;
const invalid_length_exception_1 = require("../exceptions/invalid-length.exception");
class GeneralDescription {
    get content() {
        return this._content;
    }
    validateContentLength(content) {
        return content.length >= 10 && content.length <= 30;
    }
    constructor(content) {
        const isContentLengthValid = this.validateContentLength(content);
        if (!isContentLengthValid) {
            throw new invalid_length_exception_1.InvalidLengthException();
        }
        this._content = content;
    }
}
exports.GeneralDescription = GeneralDescription;
//# sourceMappingURL=general.validation.js.map