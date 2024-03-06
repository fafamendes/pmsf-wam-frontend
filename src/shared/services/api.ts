import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if(error.response.status === 401) {
      window.location.pathname !== '/login' && window.location.replace('/login');
    }
    return Promise.reject(error);
  }
)