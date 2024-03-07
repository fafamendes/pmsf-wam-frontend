import { api } from "./api";
import { AxiosError } from "axios";

export const usersByUsername = async (username: string, limit: number = 10, token: string) => {
  try {
    const response = await api.get(`/users/like_username/${username}/${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    return error.response?.data;
  }
}