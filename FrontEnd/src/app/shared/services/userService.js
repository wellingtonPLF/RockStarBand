import api from "./_axiosConfig";
import { User } from "@models/user.js"

class UserService {

  constructor() {
    this.path = "user"
  }

  async listAll() {
    try{
      const { data } = await api.get(`${this.path}/`);
      return data;
    }
    catch(error) {
      return Promise.reject(error);
    }
  }

  async getAuthenticatedUser() {
    try{
      const { data } = await api.get(`${this.path}/getUser/`);
      return data;
    }
    catch(error) {
      return Promise.reject(error);
    }
  }

  async insert(user) {
    try{
      const { data } = await api.post(`${this.path}/`, User.refract(user));
      return data;
    }
    catch(error) {
      return Promise.reject(error);
    }
  } 

  async update(user) {
    try{
      const { data } = await api.put(`${this.path}/`, user);
      return data;
    }
    catch(error) {
      return Promise.reject(error);
    }
  }

  async delete(id) {
    try{
      const { data } = await api.delete(`${this.path}/${id}/`);
      return data;
    }
    catch(error) {
      return Promise.reject(error);
    }
  }

}

export default new UserService();