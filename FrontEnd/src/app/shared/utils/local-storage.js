export class LocalStorageUtil {

    constructor() { }
  
    getToken(token) {
        return localStorage.getItem(token);
    }
  
    setToken(token, value) {
        if (value != undefined){
            localStorage.setItem(token, value);
        }
    }
  
    removeToken(token) {
        if (token != undefined){
            localStorage.removeItem(token);
            localStorage.clear();
        }
    }
}