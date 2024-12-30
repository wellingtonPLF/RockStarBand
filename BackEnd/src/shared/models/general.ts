
import { DTO_general } from "@interfaces/entities/general.interface";
import { GeneralDescription } from "@validations/general.validation";

export class General implements DTO_general{

    private _id: number;
    private _name: string;
    private _description?: GeneralDescription;

    constructor(id:number, name: string, description: string);
    constructor();
    constructor(...myarray: any[]){
        if (myarray.length === 2) {
            this._name = myarray[0]
            this._description = myarray[1]
            return;
        }
    }

    static refract(general: General) {
        const result = { 
          id: general.id,  
          name: general.name,
          description: general.description          
        }
        return result;
    }

    get id(): number | undefined{
        return this._id;
    }

    set id(id: number | undefined) {
        this._id = id;
    }

    get name(): string | undefined{
        return this._name;
    }

    set name(name: string | undefined) {
        this._name = name;
    }

    get description(): GeneralDescription | undefined{
        return this._description;
    }

    set description(description: GeneralDescription | undefined) {
        this._description = description;
    }
}