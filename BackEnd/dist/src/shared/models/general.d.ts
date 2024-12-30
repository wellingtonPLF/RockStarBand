import { DTO_general } from "@interfaces/entities/general.interface";
import { GeneralDescription } from "@validations/general.validation";
export declare class General implements DTO_general {
    private _id;
    private _name;
    private _description?;
    constructor(id: number, name: string, description: string);
    constructor();
    static refract(general: General): {
        id: number;
        name: string;
        description: GeneralDescription;
    };
    get id(): number | undefined;
    set id(id: number | undefined);
    get name(): string | undefined;
    set name(name: string | undefined);
    get description(): GeneralDescription | undefined;
    set description(description: GeneralDescription | undefined);
}
