import { Injectable } from '@nestjs/common';
import { IUser } from '@interfaces/context.interface';
import { Request } from 'express';
import { TokenService } from '@services/token/token.service';
import { AuthService } from '@services/auth/auth.service';
import { JwtUtil } from '@utils/jwt.utils';
import { JwtType } from '@enums/jwt.enum';

@Injectable()
export class UserService {

    constructor(
        private userRepository: IUser,
        private tokenService: TokenService,
        private authService: AuthService,
        private jwtUtil: JwtUtil
    ) {}

    async findAll(): Promise<any> {
        try {
            const userDB = await this.userRepository.findAll();
            if (userDB == undefined) {
                return []
            }
            else {
                return await Promise.all(userDB.map( async (user: any) => {
                    const authDB = await this.authService.findById(user.auth_id)
                    return { 
                        id: userDB.id,
                        bornDate: userDB.bornDate,
                        nickName: userDB.nickName,
                        email:authDB.email,
                        active: userDB.active,
                        phone: userDB.phone,
                        auth_id: userDB.auth_id
                    }
                }))
            }
        }catch(e) {
            throw new Error(`Error at UserService findAll => ${e.message}`)
        }
    }

    async findById(id: number): Promise<any> {
        try {
            const userDB = await this.userRepository.findById(id);
            const authDB = await this.authService.findById(parseInt(userDB.auth_id));
            return {
                id: userDB.id,
                bornDate: userDB.bornDate,
                nickName: userDB.nickName,
                email: authDB.email,
                active: userDB.active,
                phone: userDB.phone,
                auth_id: userDB.auth_id,
            }
        }
        catch(e) {
            throw new Error(`Error at UserService findById => ${e.message}`)
        } 
    }

    async getAuthenticatedUser(request: Request): Promise<any> {
        try {
            const accessToken = request.session.token;
            const jwt = await this.tokenService.findByToken(accessToken);
            const authID = this.jwtUtil.extractSubject(jwt.key);
            const authDB = await this.authService.findById(parseInt(authID));
            const userDB = await this.userRepository.findByAuthId(authDB.id);
            const user =
            { 
                id: userDB.id,
                bornDate: userDB.bornDate,
                nickName: userDB.nickName,
                email:authDB.email,
                active: userDB.active,
                phone: userDB.phone,
                auth_id: userDB.auth_id,
            }
            return user;
        }
        catch(e) {
            throw new Error(`Error at UserService GetAuthenticatedUser => ${e.message}`)
        }
    }
    
    async insert({ nickName, phone, bornDate, auth_id }: any): Promise<any> {
        try {
            const userDB = await this.userRepository.insert({ nickName, phone, bornDate, auth_id });
            const authDB = await this.authService.findByUserID(userDB.id);
            const result = 
            { 
                id: userDB.id,
                bornDate: userDB.bornDate,
                nickName: userDB.nickName,
                email:authDB.email,
                ativo: userDB.ativo,
                phone: userDB.phone,
                auth_id: userDB.auth_id,
            }
            return result
        }
        catch(e) {
            throw new Error(`Error at UserService insert => ${e.message}`)
        }
    }

    async update(user: any): Promise<any> {
        try {
            if (user == null) {
                throw new Error(JwtType.INVALID_USER.toString());
            }
            return await this.userRepository.update(user);
        }
        catch(e) {
            throw new Error(`Error at UserService update => ${e.message}`)
        }
    }

    async disable(id: number, request: Request): Promise<any> {
        try {
            if (id == null) {
                throw new Error("UserId is null");
            }
            await this.authService.getAuthValidation(id, request);
            await this.userRepository.disableUserByAuthId(id);
        }
        catch(e) {
            throw new Error(`Error at UserService disable => ${e.message}`)
        }
    }
}
