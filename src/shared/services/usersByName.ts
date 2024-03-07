import { AxiosError } from "axios";
import { api } from "./api";

export const usersByName = async (name: string, limit: number = 10, token: string) => {
  try {
    const response = await api.get(`/users/like_name/${name}/${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    return error.response?.data;
  }
}