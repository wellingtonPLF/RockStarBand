import { Auth_roles } from "@prisma/client"

export class CheckSeed {

    static async simpleCheck(objects: any, db: any): Promise<Array<any>> {
        const list: Array<any> = await db.findMany()
        return objects.filter( (o: any) => {
            let result = true
            for (const obj of list){
                if (o.id == obj.id){
                    result = false
                    break
                }
            }
            if (result){
                return o
            }
        })
    }

    static async authRolesCheck(objects: Array<Auth_roles>, db: any): Promise<Array<Auth_roles>> {
        const list: Array<Auth_roles> = await db.findMany()
        return objects.filter( (o: any) => {
            let result = true
            for (const obj of list){
                if (o.auth_id == obj.auth_id && o.role_id == obj.role_id){
                    result = false
                    break
                }
            }
            if (result){
                return o
            }
        })
    }
}