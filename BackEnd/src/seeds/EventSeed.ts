import { Events } from "@prisma/client";

const eventSeedList: Array<Events>  = []

export const eventSeed = () => {
    const event = {
        location: "Centro",
        city: "João Pessoa",
        country: "BR"
    }
    const eventDate = ["3000-01-21","3000-04-15","3000-06-08","3000-08-12","3000-10-19", "3000-12-11"]
    const qntEvent = eventDate.length;
    let newDate = undefined;

    for (let id = 1; id <= qntEvent; id++) {
        newDate = new Date(eventDate[id - 1])
        newDate.setDate(newDate.getDate() - 7)
        eventSeedList.push({ 
            ... event,
            id: BigInt(id), 
            event_initial_date: newDate, 
            event_end_date: new Date(eventDate[id - 1])
        })
    }
    return eventSeedList;
}