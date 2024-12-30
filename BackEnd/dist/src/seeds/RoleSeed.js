"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleSeed = void 0;
const client_1 = require("@prisma/client");
exports.roleSeed = new Array({
    id: 1,
    roleName: client_1.RoleNames.ROLE_ADMIN
}, {
    id: 2,
    roleName: client_1.RoleNames.ROLE_USER
});
//# sourceMappingURL=RoleSeed.js.map