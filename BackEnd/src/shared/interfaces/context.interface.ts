
export abstract class IGeneral {
    abstract sayHello(): Promise<string>;
}

export abstract class IAuth {
    abstract findById(id: number): Promise<any>;
    abstract findByUserId(id: number): Promise<any>;
    abstract findByEmail(email: string): Promise<any>;
    abstract findByUsername(username: string): Promise<any>;
    abstract findAuthRolesByAuthId(id: number): Promise<any>;
    abstract create(auth: any): Promise<any>;
    abstract update(auth: any): Promise<any>;
}

export abstract class IUser {
    abstract findAll(): Promise<any>;
    abstract findById(user_id: number): Promise<any>;    
    abstract findByAuthId(auth_id: number): Promise<any>;    
    abstract insert(user: any): Promise<any>;    
    abstract update(user: any): Promise<any>;    
    abstract disableUserByAuthId(auth_id: number): Promise<any>;    
}

export abstract class IToken {
    abstract findByToken(token: string): Promise<any>;
    abstract findByAuthId(id: number): Promise<any>;
    abstract insert(token: string): Promise<any>;
    abstract update(token: string): Promise<any>;
    abstract delete(id: number): Promise<any>;
    abstract deleteByAuthID(auth_id: number) : Promise<any>;
}

export abstract class IEvent {
    abstract findAll(): Promise<any>;
    abstract getAllValid(): Promise<any>;
    // abstract findById(event_id: number): Promise<any>;        
    // abstract create(event: any): Promise<any>;    
    // abstract update(event: any): Promise<any>;    
}

export abstract class ITicket {
    abstract findAll(): Promise<any>;
    abstract findById(user_id: number): Promise<any>;        
    // abstract update(user: any): Promise<any>;    
}