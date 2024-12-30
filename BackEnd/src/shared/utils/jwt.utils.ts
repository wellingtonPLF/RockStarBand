import jwt, { JwtPayload } from 'jsonwebtoken';
import { JwtType } from "@enums/jwt.enum";
import { Injectable } from "@nestjs/common";
import { env } from "process";
import { generateKey } from './random-key.utils';

@Injectable()
export class JwtUtil {
    
    private SECRET_KEY: string;

    constructor() {
        this.SECRET_KEY = generateKey(env.JWT_SECRET);
    }

    generateToken({ auth_id } , type: number): string {
        const currentTime = Math.floor(Date.now() / 1000);

        const payload: any = {
            sub: auth_id,
            iat: currentTime,
            exp: currentTime + 60 * 60 * type
        }

        return jwt.sign(payload, this.SECRET_KEY)
    }

    extractSubject(key: string): string {
        try{
            return this.extractClaim(key, "sub");
        }   
        catch(_) {
            throw new Error(JwtType.EXPIRED_AT.toString())
        }
    }
	
	extractClaim(token: string, claim: string): string {
        const claims: JwtPayload | string = this.extractAllClaims(token);
        return claims[claim];
	}
	
	extractAllClaims(token: string): JwtPayload | string {
		return jwt.verify(token, this.SECRET_KEY) ;
	}
}