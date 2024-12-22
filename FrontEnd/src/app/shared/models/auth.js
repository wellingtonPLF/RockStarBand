import { User } from "@models/user.js"
import { roleEnum as RoleEnum } from '@enums/role.enum';

export class Auth {
    constructor(
        id,
        username,
        email,
        active,
        password,
        roles,
        user
    ) {
        this._id = id;
        this._username = username;
        this._email = email;
        this._active = active;
        this._password = password;
        this._roles = roles;
        this._user = user;
    }

    get  id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get  username() {
        return this._username;
    }

    set username(value) {
        this._username = value;
    }

    get  email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get  active() {
        return this._active;
    }

    set active(value) {
        this._active = value;
    }

    get  password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }

    get  roles() {
        return this._roles;
    }

    set roles(value) {
        this._roles = value;
    }

    get  user() {
        return this._user;
    }

    set user(value) {
        this._user = value;
    }


    static refract(another) {
        return {
            id: another.id,
            username: another.username,
            email: another.email,
            active: true,
            password: another.password,
            roles: RoleEnum.ROLE_USER,
            user: User.refract(another.user)
        };
    }

    toString() {
        return `Auth(
            id: ${this._id}
            username: ${this._username}
            email: ${this._email}
            active: ${this._active}
            password: ${this._password}
            roles: ${this._roles}
            user: ${this._user}
        )`;
    }
}