import { AxiosError } from 'axios';
import { api } from './api';

export const searchByString = async (string: string, limit: number = 10, token: string) => {
  try {
    const response = await api.get(`/users/search/${string}/${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data

  } catch (e) {
    const error = e as AxiosError;
    return error.response?.data;
  }
}

