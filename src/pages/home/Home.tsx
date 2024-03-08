import { useUserContext } from "@context/UserContext"
import { SearchUsers } from "@layouts/search-users/SearchUsers"

export const Home = () => {

  const { user } = useUserContext()

  return (
    <div className="flex flex-col items-center justify-center">
      {user?.role === 'ADMIN' && <SearchUsers />}
    </div>
  )
}