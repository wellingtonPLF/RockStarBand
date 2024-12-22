export class Event {
    constructor(
        city,
        country,
        event_end_date,
        event_initial_date,
        location,
        id,
    ) {
        this._city = city;
        this._country = country;
        this._event_end_date = event_end_date;
        this._event_initial_date = event_initial_date;
        this._location = location;
        this._id = id;
        this._value = value;        
    }

    get city() {
        return this._city
    }

    set city(value) {
        this._city = value;
    }

    get country() {
        return this._country
    }

    set country(value) {
        this._country = value;
    }

    get event_end_date() {
        return this._event_end_date
    }

    set event_end_date(value) {
        this._event_end_date = value;
    }

    get event_initial_date() {
        return this._event_initial_date
    }

    set event_initial_date(value) {
        this._event_initial_date = value;
    }

    get location() {
        return this._location
    }

    set location(value) {
        this._location = value;
    }

    get id() {
        return this._id
    }

    set id(value) {
        this._id = value;
    }

    static refract(another) {
        return {
            city: another.city,
            country: another.country,
            event_end_date: another.event_end_date,
            event_initial_date: another.event_initial_date,
            location: another.location,
            id: another.id,
        };
    }

    toString() {
        return `Event(
            city: ${this._.city}
            country: ${this._.country}
            event_end_date: ${this._.event_end_date}
            event_initial_date: ${this._.event_initial_date}
            location: ${this._.location}
            id: ${this._.id}
        )`;
    }
}