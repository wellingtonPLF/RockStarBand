export class TicketUser {
    constructor(
        ticket_id,
        user_id,
        purchase_date,
        quantity
    ) {
        this._ticket_id = ticket_id;
        this._user_id = user_id;
        this._purchase_date = purchase_date;
        this._quantity = quantity;
    }

    get ticket_id() {
        return this._ticket_id
    }

    set ticket_id(value) {
        this._ticket_id = value;
    }

    get user_id() {
        return this._user_id
    }

    set user_id(value) {
        this._user_id = value;
    }

    get purchase_date() {
        return this._purchase_date
    }

    set purchase_date(value) {
        this._purchase_date = value;
    }

    get quantity() {
        return this._quantity
    }

    set quantity(value) {
        this._quantity = value;
    }

    static refract(another) {
        return {
            ticket_id: another.ticket_id,
            user_id: another.user_id,
            purchase_date: another.purchase_date,
            quantity: another.quantity
        };
    }

    toString() {
        return `TicketUser(
            ticket_id: ${this._ticket_id})
            user_id: ${this._user_id})
            purchase_date: ${this._purchase_date})
            quantity: ${this._quantity})
        `;
    }
}