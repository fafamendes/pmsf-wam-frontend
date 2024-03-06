import { AxiosError } from 'axios';
import { api } from './api';

export const me = async (token: string) => {
  try {
    const response = await api.get('/users/me', {
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