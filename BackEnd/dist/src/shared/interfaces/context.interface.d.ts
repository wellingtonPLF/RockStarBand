export declare abstract class IGeneral {
    abstract sayHello(): Promise<string>;
}
export declare abstract class IAuth {
    abstract findById(id: number): Promise<any>;
    abstract findByUserId(id: number): Promise<any>;
    abstract findByEmail(email: string): Promise<any>;
    abstract findByUsername(username: string): Promise<any>;
    abstract findAuthRolesByAuthId(id: number): Promise<any>;
    abstract create(auth: any): Promise<any>;
    abstract update(auth: any): Promise<any>;
}
export declare abstract class IUser {
    abstract findAll(): Promise<any>;
    abstract findById(user_id: number): Promise<any>;
    abstract findByAuthId(auth_id: number): Promise<any>;
    abstract insert(user: any): Promise<any>;
    abstract update(user: any): Promise<any>;
    abstract disableUserByAuthId(auth_id: number): Promise<any>;
}
export declare abstract class IToken {
    abstract findByToken(token: string): Promise<any>;
    abstract findByAuthId(id: number): Promise<any>;
    abstract insert(token: string): Promise<any>;
    abstract update(token: string): Promise<any>;
    abstract delete(id: number): Promise<any>;
    abstract deleteByAuthID(auth_id: number): Promise<any>;
}
export declare abstract class IEvent {
    abstract findAll(): Promise<any>;
    abstract getAllValid(): Promise<any>;
}
export declare abstract class ITicket {
    abstract findAll(): Promise<any>;
    abstract findById(user_id: number): Promise<any>;
}
