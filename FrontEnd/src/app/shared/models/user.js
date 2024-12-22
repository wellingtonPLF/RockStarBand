export class User {
    constructor(
        id,
        nickName,
        phone,
        active,
        bornDate,
        auth_id,
        event_user,
        auth
    ) {
        this._id = id;
        this._nickName = nickName;
        this._phone = phone;
        this._active = active;
        this._bornDate = bornDate;
        this._auth_id = auth_id;
        this._event_user = event_user;
        this._auth = auth;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get nickName() {
        return this._nickName;
    }

    set nickName(value) {
        this._nickName = value;
    }

    get phone() {
        return this._phone;
    }

    set phone(value) {
        this._phone = value;
    }

    get active() {
        return this._active;
    }

    set active(value) {
        this._active = value;
    }

    get bornDate() {
        return this._bornDate;
    }

    set bornDate(value) {
        this._bornDate = value;
    }

    get auth_id() {
        return this._auth_id;
    }

    set auth_id(value) {
        this._auth_id = value;
    }

    get event_user() {
        return this._event_user;
    }

    set event_user(value) {
        this._event_user = value;
    }

    get auth() {
        return this._auth;
    }

    set auth(value) {
        this._auth = value;
    }

    static refract(another) {
        return {
            id: another.id,
            nickName: another.nickName,
            phone: another.phone,
            active: another.active,
            bornDate: another.bornDate,
            auth_id: another.auth_id,
            event_user: another.event_user,
            auth: another.auth
        };
    }

    toString() {
        return `User(
            id: ${this._id},
            nickName: ${this._nickName},
            phone: ${this._phone},
            active: ${this._active},
            bornDate: ${this._bornDate},
            auth_id: ${this._auth_id},
            event_user: ${this._event_user},
            auth: ${this._auth}
        )`;
    }
}