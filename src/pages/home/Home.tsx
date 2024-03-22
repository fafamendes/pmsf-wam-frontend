import { useUserContext } from "@context/UserContext"
import { ChangePassword } from "@layouts/password/ChangePassword"
import { SearchUsers } from "@layouts/search-users/SearchUsers"
import { UserInfo } from "@layouts/user-info/UserInfo"

export const Home = () => {

  const { user } = useUserContext()

  return (
    <div className="flex flex-col items-center justify-center">
      {user?.role === 'ADMIN' ?
        <SearchUsers /> :
        <div className="gap-4 pt-4">
          <UserInfo />
          <ChangePassword />
        </div>
      }
    </div>
  )
}