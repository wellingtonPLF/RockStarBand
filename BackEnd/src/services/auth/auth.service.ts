import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { IAuth } from '@interfaces/context.interface';
import { JwtType, TokenType } from '@enums/jwt.enum';
import { JwtUtil } from '@utils/jwt.utils';
import { TokenData } from "@interfaces/entities/token.interface";
import { TokenService } from '@services/token/token.service';
import { CookieUtil } from '@utils/cookie.utils';
import bcrypt from 'bcrypt';
import { ErrorEnum } from '@/shared/enums/errors.enum';

@Injectable()
export class AuthService {

    private accessTokenName!: string;
    private refreshTokenName!: string;
    private salts!: number;

    constructor(
        private authRepository: IAuth, 
        private tokenService: TokenService,
        private jwtUtil: JwtUtil,
        private cookieUtil: CookieUtil,
    ) {
        this.accessTokenName = TokenType.AT_NAME;
        this.refreshTokenName = TokenType.RT_NAME;
        this.salts = 10;
    }

    public async authenticate(auth: any, req: Request, res: Response): Promise<any> {
        let authDB: any;
		try {
			if (auth.email != undefined) {
				authDB = await this.authRepository.findByEmail(auth.email);
			}
			else if (auth.username != undefined) {
				authDB = await this.authRepository.findByUsername(auth.username)
			}
			
            if (authDB == undefined) {
                throw new Error(ErrorEnum.userNotFound);
            }
            
            let valid = await bcrypt.compare(auth.password, authDB.password);
			if(!valid) {
				throw new Error(ErrorEnum.incorrectPwd);
			}
			await this.tokenService.genJwtCookie(req, res, authDB.id, this.accessTokenName, this.refreshTokenName);
            return authDB
		}
		catch (e) {
            throw new Error(`Error at AuthService authenticate => ${e.message}`)
		}
    }

    public async refresh(req: Request, res: Response): Promise<any> {
        const accessToken = this.cookieUtil.getCookieValue(req, this.accessTokenName);
		const jwt = await this.tokenService.findByToken(accessToken);
        let authID: string;
        try {
            this.jwtUtil.extractSubject(jwt.key);
            return jwt.key;
        }
        catch(_){
            const refreshToken = this.cookieUtil.getCookieValue(req, this.refreshTokenName);
			if (refreshToken == null) {
				throw new Error(JwtType.INVALID_RT.toString());
			}
            try{
                authID = this.jwtUtil.extractSubject(refreshToken);
            }
            catch(_){
                throw new Error(JwtType.EXPIRED_RT.toString())
            }
            const jwtData = { auth_id: authID };
			const jwtToken = this.jwtUtil.generateToken(jwtData, TokenType.ACCESS_TOKEN);
			const jwtRefresh = this.jwtUtil.generateToken(jwtData, TokenType.REFRESH_TOKEN);
			jwt.key = jwtToken;
			await this.tokenService.update(jwt);
			this.cookieUtil.create(res, this.accessTokenName, jwtToken, req.secure, req.hostname);
			this.cookieUtil.create(res, this.refreshTokenName, jwtRefresh , req.secure, req.hostname);
            console.log("REFRESH !!!")
            return jwtToken
        }
    }

    public async recover(_email: string): Promise<any> {
        try {
            const { id } = await this.authRepository.findByEmail(_email);
            const recover = this.jwtUtil.generateToken({ auth_id: id }, TokenType.ACCESS_TOKEN);
            const result = await this.tokenService.findByAuthID(id);
            if (result != undefined) {
                await this.tokenService.update({ id: result.id, key: recover, auth_id: result.auth_id });
            }
            else {
                await this.tokenService.insert({ key: recover, auth_id: id });
            }
            return "Verifique seu Email para salvar uma nova senha.";
		}
		catch(_) {
            throw new Error(`E-mail não está cadastrado.`)
		}
    }

    public async logout(req: Request, res: Response): Promise<any> {
        try {
			const jwt = this.cookieUtil.getCookieValue(req, this.accessTokenName);
			const jwtDB = await this.tokenService.findByToken(jwt);
			this.cookieUtil.clear(res, this.accessTokenName);
		    this.cookieUtil.clear(res, this.refreshTokenName);
		    this.tokenService.delete(jwtDB.id);
		}
		catch(e) {
            throw new Error(`Error at AuthService logout => ${e.message}`)
		}
    }

    public async getAuthenticatedRole(request: Request): Promise<number> {
        try {
            const auth_id: string = this.jwtUtil.extractSubject(request.session.token);
            const { role_id: role } = await this.findAuthRolesByAuthId(parseInt(auth_id))
            return role;
        }
        catch(e) {
            throw new Error(`Error at AuthService GetAuthenticatedRole => ${e.message}`)
        }
    }

    public async getAuthValidation(auth_id: number, req: Request): Promise<any> {
        const accessToken = req.session.token;
        const jwt = await this.tokenService.findByToken(accessToken);
        const authID = this.jwtUtil.extractSubject(jwt.key);
        const { role_id: authenticated_role} = await this.authRepository.findAuthRolesByAuthId(parseInt(authID));
        const { role_id: verifying_role} = await this.authRepository.findAuthRolesByAuthId(auth_id);

        if (parseInt(authID) != auth_id) {
            if (authenticated_role <= verifying_role) {
                throw new Error(JwtType.NOT_AUTHORIZED.toString());
            }
        }
    }

    public async isLoggedIn(request: Request): Promise<boolean> {
        const jwt: string | null = this.cookieUtil.getCookieValue(request, this.accessTokenName!);
        let jwtDB: TokenData;
        try {
            jwtDB = await this.tokenService.findByToken(jwt!);
        }
        catch(e){
            return false
        }
        this.jwtUtil.extractSubject(jwtDB.key);
        return true
    } 

    public async acceptAuth({ id, password }: any, req: Request): Promise<any> {
        try {
            await this.getAuthValidation(id, req);
            const authDB = await this.authRepository.findById(id);
            let valid = await bcrypt.compare(password, authDB.password);
    
            if(!valid) {
                throw new Error("Incorrect Email or Password , try again.");
            }
        }
        catch(e) {
            throw new Error(`Error at AuthService acceptAuth => ${e.message}`)
        }
    }

    public async findAuthRolesByAuthId(auth_id: number): Promise<{ role_id: number }> {
        try {
            const authRoles = await this.authRepository.findAuthRolesByAuthId(auth_id);
            return authRoles;
        }   
        catch(e) {
            throw new Error(`Error at AuthService findAuthRolesByAuthId => ${e.message}`)
        } 
    } 

    public async findById(id: number): Promise<any> {
        try {
            const user = await this.authRepository.findById(id);
            return user;
        }   
        catch(e) {
            throw new Error(`Error at AuthService findById => ${e.message}`)
        }
    }

    public async findByUserID(user_id: number, req?: Request): Promise<any> {
        try {
            const user = await this.authRepository.findByUserId(user_id);
            return user;
        }   
        catch(e) {
            throw new Error(`Error at AuthService findByUserID => ${e.message}`)
        } 
    }

    public async insert({ email, username, password, role_id }: any): Promise<any> {
        try {
            const passwordHash  = await bcrypt.hash(password, this.salts)
            if (email == undefined || email == "") {
                throw new Error("Email inválido!");
            }
            else if (password == undefined || password == "") {
                throw new Error("Senha inválida!")
            }
            const authDB = await this.authRepository.create({ email, username, password: passwordHash, role_id });
            return authDB;
        }   
        catch(e) {
            throw new Error(`Error at AuthService insert => ${e.message}`)
        } 
    }

    public async update(auth: any): Promise<any> {
        try {
            const authDB = await this.authRepository.findById(auth.id);
            if (auth.password != null) {
                authDB.password  = await bcrypt.hash(auth.password, this.salts)   
            }
            if (auth.email != null) {
                authDB.email = auth.email; 
            }
            if (auth.username != null) {
                authDB.username = auth.username;
            }
            await this.authRepository.update(authDB);
        }   
        catch(e) {
            throw new Error(`Error at AuthService update => ${e.message}`)
        } 
    }
}
