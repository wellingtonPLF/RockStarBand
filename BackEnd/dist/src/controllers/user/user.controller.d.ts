import { UserService } from '@/services/user/user.service';
import { Request, Response } from 'express';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    listUsers(req: Request, res: Response): Promise<void>;
    getUser(req: Request, res: Response): Promise<void>;
    createUser(req: Request, res: Response): Promise<void>;
    updateUser(req: Request, res: Response): Promise<void>;
    deleteUser(req: Request, res: Response): Promise<void>;
}
