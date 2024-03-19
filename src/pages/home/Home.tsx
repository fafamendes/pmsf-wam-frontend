import { useUserContext } from "@context/UserContext"
import { ChangePassword } from "@layouts/password/ChangePassword"
import { SearchUsers } from "@layouts/search-users/SearchUsers"

export const Home = () => {

  const { user } = useUserContext()

  return (
    <div className="flex flex-col items-center justify-center">
      {user?.role === 'ADMIN' ?
        <SearchUsers /> :
        <ChangePassword />
      }
    </div>
  )
}