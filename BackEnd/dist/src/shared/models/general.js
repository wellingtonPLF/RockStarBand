"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.General = void 0;
class General {
    constructor(...myarray) {
        if (myarray.length === 2) {
            this._name = myarray[0];
            this._description = myarray[1];
            return;
        }
    }
    static refract(general) {
        const result = {
            id: general.id,
            name: general.name,
            description: general.description
        };
        return result;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    get description() {
        return this._description;
    }
    set description(description) {
        this._description = description;
    }
}
exports.General = General;
//# sourceMappingURL=general.js.map