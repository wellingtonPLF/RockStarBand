import { sleep } from "../utils/general.utils";
import api from "./_axiosConfig";
import { TicketUser } from "@models/ticketUser.js"

class EventService {

  constructor() {
    this.path = "event-tickets"
  }

  async listAll() {
    try{
      const { data } = await api.get(`${this.path}/getAllEvents/`);
      return data;
    }
    catch(error) {
      return Promise.reject(error);
    }
  }

  async getUserEvents() {
    try{
      const { data } = await api.get(`${this.path}/getUserEvents/`);
      return data;
    }
    catch(error) {
      return Promise.reject(error);
    }
  }

  async insert(ticketUser) {
    try{
      const { data } = await api.post(`${this.path}/insertEventTicket/`, TicketUser.refract(ticketUser));
      return data;
    }
    catch(error) {
      return Promise.reject(error);
    }
  } 

}

export default new EventService();