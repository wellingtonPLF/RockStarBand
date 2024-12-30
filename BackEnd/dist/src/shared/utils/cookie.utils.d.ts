import { Request, Response } from 'express';
export declare class CookieUtil {
    getCookieValue(request: Request, name: string): string | undefined;
    create(response: Response, name: string, value: string, secure: boolean, domain: string): void;
    clear(response: Response, name: string): void;
}
