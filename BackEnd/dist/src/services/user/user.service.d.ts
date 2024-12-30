import { IUser } from '@interfaces/context.interface';
import { Request } from 'express';
import { TokenService } from '@services/token/token.service';
import { AuthService } from '@services/auth/auth.service';
import { JwtUtil } from '@utils/jwt.utils';
export declare class UserService {
    private userRepository;
    private tokenService;
    private authService;
    private jwtUtil;
    constructor(userRepository: IUser, tokenService: TokenService, authService: AuthService, jwtUtil: JwtUtil);
    findAll(): Promise<any>;
    findById(id: number): Promise<any>;
    getAuthenticatedUser(request: Request): Promise<any>;
    insert({ nickName, phone, bornDate, auth_id }: any): Promise<any>;
    update(user: any): Promise<any>;
    disable(id: number, request: Request): Promise<any>;
}
