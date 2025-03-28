import api from "./shared/services/_axiosConfig";
import authService from "./shared/services/authService";

export const registerRequestInterceptor = () => {
  return api.interceptors.request.use((request) => {
    return request;
  });
};

export const registerResponseInterceptor = () => {
  return api.interceptors.response.use((response) => {
    return response;
  }, 
  async (err) => {
    const error = err.response.data
    if(error.status == 401 && error.type === "EXPIRED_AT") {
      return authService.refreshToken().then(
        () => {
          return api.request(err.config);
        }
      ).catch((msg) => {
        if (msg.type != undefined){
          return authService.logOut().then(
            () => {
              return api.request(err.config);
            }
          ).catch((e) => {
            return Promise.reject(e.response.data);
          });
        }
        return Promise.reject(error);
      });
    }
    else {
      return Promise.reject(error);
    }
  });
}