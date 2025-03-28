import { Request, Response } from 'express';

export class CookieUtil {
	
	public getCookieValue(request: Request, name: string): string | undefined {
        try{
            return request.cookies[name];
        }
        catch(e){
            return undefined
        }
	}
	
	public create(response: Response, name: string, value: string,
        secure: boolean, domain: string): void {

        const config: any = { 
            maxAge: 1000 * 60 * 60 * 24 * 365, 
            httpOnly: true,
            secure: secure,
            domain: domain,
            path: "/"
        }
        response.cookie(name, value, config);
    }
    
    public clear(response: Response, name: string): void {
        response.clearCookie(name)
    }
}