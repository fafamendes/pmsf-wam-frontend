import { AxiosError } from "axios";
import { api } from "./api";



export const login = async (username: string, password: string) => {
  try {
    const response = await api.post('/users/login', { username, password },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    return error.response?.data;
  }
}