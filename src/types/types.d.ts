type User = {
  id: string
  username: string
  password: string
  role: string
  name: string
  status: boolean
}

type UsersRequest = {
  users: User[]
  message?: string
  error?: string
}