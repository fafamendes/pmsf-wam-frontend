import { AxiosError } from "axios";
import { api } from "./api";

export const updateUser = async (user: Omit<User, "password">, token: string) => {
  try {
    const response = await api.put(`/users/${user.id}`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    return error.response?.data;
  }
}