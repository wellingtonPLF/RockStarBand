import api from "./_axiosConfig";
import { Auth } from "@models/auth.js"

class AuthService {

  constructor() {
    this.path = "auth"
  }

  async authentication(auth) {
    try{
      const { data } = await api.post(`${this.path}/authentication/`, auth);
      return data;
    }
    catch(error) {
      return Promise.reject(error.response.data);
    }
  }

  async isLoggedIn() {
    try{
      const { data } = await api.get(`${this.path}/isLoggedIn/`);
      return data;
    }
    catch(error) {
      return Promise.reject(error);
    }
  }

  async authInsert(auth) {
    try{
      const { data } = await api.post(`${this.path}/`, Auth.refract(auth));
      return data;
    }
    catch(error) {
      return Promise.reject(error.response.data);
    }
  }

  async authUpdate(auth) {
    try{
      const { data } = await api.post(`${this.path}/`, auth);
      return data;
    }
    catch(error) {
      return Promise.reject(error);
    }
  }

  async acceptAuth(auth) {
    try{
      const { data } = await api.post(`${this.path}/acceptAuth/`, auth);
      return data;
    }
    catch(error) {
      return Promise.reject(error);
    }
  }

  async refreshToken() {
    try{
      const { data } = await api.get(`${this.path}/refresh/`);
      return data;
    }
    catch(error) {
      return Promise.reject(error);
    }
  }

  async testando() {
    try{
      const { data } = await api.get(`${this.path}/testando/`);
      return data;
    }
    catch(error) {
      return Promise.reject(error);
    }
  }

  async logOut() {
    try{
      const { data } = await api.get(`${this.path}/logout/`);
      return data;
    }
    catch(error) {
      return Promise.reject(error);
    }
  }
}

export default new AuthService();