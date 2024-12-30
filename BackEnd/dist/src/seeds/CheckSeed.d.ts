import { Auth_roles } from "@prisma/client";
export declare class CheckSeed {
    static simpleCheck(objects: any, db: any): Promise<Array<any>>;
    static authRolesCheck(objects: Array<Auth_roles>, db: any): Promise<Array<Auth_roles>>;
}
