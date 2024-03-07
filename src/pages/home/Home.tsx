import { useUserContext } from "@context/UserContext"
import { SearchUsers } from "@layouts/SearchUsers"

export const Home = () => {

  const { user } = useUserContext()

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Home</h1>
      {user?.role && <SearchUsers />}
    </div>
  )
}