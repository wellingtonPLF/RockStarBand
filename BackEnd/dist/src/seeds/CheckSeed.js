"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckSeed = void 0;
class CheckSeed {
    static async simpleCheck(objects, db) {
        const list = await db.findMany();
        return objects.filter((o) => {
            let result = true;
            for (const obj of list) {
                if (o.id == obj.id) {
                    result = false;
                    break;
                }
            }
            if (result) {
                return o;
            }
        });
    }
    static async authRolesCheck(objects, db) {
        const list = await db.findMany();
        return objects.filter((o) => {
            let result = true;
            for (const obj of list) {
                if (o.auth_id == obj.auth_id && o.role_id == obj.role_id) {
                    result = false;
                    break;
                }
            }
            if (result) {
                return o;
            }
        });
    }
}
exports.CheckSeed = CheckSeed;
//# sourceMappingURL=CheckSeed.js.map