import { RoleNames, Roles } from "@prisma/client";

export const roleSeed = new Array<Roles>(
    {
        id: 1,
        roleName: RoleNames.ROLE_ADMIN
    },
    {
        id: 2,
        roleName: RoleNames.ROLE_USER
    }
)