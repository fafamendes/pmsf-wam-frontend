import axios from "axios";

console.log(process.env.REACT_APP_API_URL)

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    window.location.href = '/login';
    return Promise.reject(error);
  }
)