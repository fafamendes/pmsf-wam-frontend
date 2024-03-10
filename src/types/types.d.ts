type User = {
  id: string
  username: string
  password: string
  role: string
  name: string
  status: boolean
}

type UsersResponse = {
  users: User[]
  message?: string
  error?: string
}