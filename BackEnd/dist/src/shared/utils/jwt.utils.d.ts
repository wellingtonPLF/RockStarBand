import { JwtPayload } from 'jsonwebtoken';
export declare class JwtUtil {
    private SECRET_KEY;
    constructor();
    generateToken({ auth_id }: {
        auth_id: any;
    }, type: number): string;
    extractSubject(key: string): string;
    extractClaim(token: string, claim: string): string;
    extractAllClaims(token: string): JwtPayload | string;
}
