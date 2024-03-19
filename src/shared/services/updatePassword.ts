import { api } from "./api";

export const updatePassword = async (id: string, password: string, token: string) => {

  const response = await api.patch(`/users/update_password/${id}`, { password }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data
}