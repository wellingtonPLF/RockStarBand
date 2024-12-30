import { TokenType } from '@/shared/enums/jwt.enum';
import { CookieUtil } from '@/shared/utils/cookie.utils';
import { JwtUtil } from '@/shared/utils/jwt.utils';
import { Injectable } from '@nestjs/common';
import { TokenRepository } from '@repositories/token.repository';
import { Request, Response } from 'express';

@Injectable()
export class TokenService {

    constructor(
        private tokenRepository: TokenRepository,
        private jwtUtil: JwtUtil,
        private cookieUtil: CookieUtil
    ) {}

    public async genJwtCookie(req: Request, res: Response,auth_id: number, access_token: string, refresh_token: string): Promise<any> {
        const jwtToken = this.jwtUtil.generateToken({ auth_id }, TokenType.ACCESS_TOKEN);
        const refreshToken = this.jwtUtil.generateToken({ auth_id }, TokenType.REFRESH_TOKEN);
        const jwt = { key: jwtToken, auth_id }
        await this.deleteByAuthID(auth_id).catch(() => {});
        await this.insert(jwt);
        this.cookieUtil.create(res, access_token, jwtToken, req.secure, req.hostname);
        this.cookieUtil.create(res, refresh_token, refreshToken, req.secure, req.hostname);

        req.session.token = jwtToken;
        req.session.refresh = refreshToken;
    }

    public async findByToken(token: string): Promise<any> {
        try {
            return await this.tokenRepository.findByToken(token);
        }   
        catch(e) {
            throw new Error(`Error at TokenService findByToken => User is not logged! Token Invalido...`)
        }
    }
    
    public async findByAuthID(id: number) {
        try {
            const tokenDB = await this.tokenRepository.findByAuthId(id);
            return tokenDB;  
        }   
        catch(e) {
            throw new Error(`Error at TokenService findByAuthID => ${e.message}`)
        } 
    }

    public async insert(jwt: any) {
        try {
            await this.tokenRepository.insert(jwt);  
        }   
        catch(e) {
            throw new Error(`Error at TokenService insert => ${e.message}`)
        } 
    }

    public async update(jwt: any){
        try {
            await this.tokenRepository.update(jwt);  
        }   
        catch(e) {
            throw new Error(`Error at TokenService update => ${e.message}`)
        } 
    }

    public async delete(id: number){
        try {
            await this.tokenRepository.delete(id);     
        }   
        catch(e) {
            throw new Error(`Error at TokenService delete => ${e.message}`)
        } 
    }
    
    public async deleteByAuthID(auth_id: number) {
        try {
            await this.tokenRepository.deleteByAuthID(auth_id);  
        }   
        catch(e) {
            throw new Error(`Error at TokenService deleteByAuthID => ${e.message}`)
        } 
    }
}
