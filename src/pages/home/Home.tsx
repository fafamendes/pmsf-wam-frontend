import { useTokenContext } from "@context/TokenContext"
import { useUserContext } from "@context/UserContext"
import { SearchUsers } from "@layouts/SearchUsers"

export const Home = () => {

  const { user } = useUserContext()
  const { logout } = useTokenContext();

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Home</h1>
      <button onClick={logout}>Logout</button>
      {user?.role === 'ADMIN' && <SearchUsers />}
    </div>
  )
}