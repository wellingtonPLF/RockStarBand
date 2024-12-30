import { IGeneral } from "@interfaces/context.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GeneralRepository implements IGeneral{
    async sayHello(): Promise<string> {
        const hello = "Hello World"; 
        return hello
    }
}