
import { Input } from "@/components/ui/input"
import { useCallback, useState, useRef } from "react"

import { usersByUsername } from "@services/usersByUsername";
import { usersByName } from "@services/usersByName";
import { useTokenContext } from "@context/TokenContext";
import { Separator } from "@/components/ui/separator";
import { UserEditDialog } from "@components/user-edit-dialog/UserEditDialog";

export const SearchUsers = () => {

  const [users, setUsers] = useState<User[]>([]);
  const { token } = useTokenContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      setUsers([]);
    }
  }

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const fetchUsers = async () => {

      const search = event.target.value.replaceAll(/[^\w\s]/gi, '');
      event.target.value = search;

      if (!search) {
        setUsers([]);
        return;
      }

      const usersByNameList: UsersRequest = await usersByName(search, 10, token!);
      const usersByUsernameList: UsersRequest = await usersByUsername(search, 10, token!);

      setUsers([...usersByNameList.users, ...usersByUsernameList.users]);
    }
    fetchUsers();
  }, [token])

  return (
    <div className="flex flex-col gap-[0.8px] mt-10 align-center">
      <form action="" className="flex justify-center relative">
        <div className="flex items-center relative">
          <Input ref={inputRef} className="text-center italic w-[400px] padding-x-4 uppercase" onChange={handleSearch} placeholder="Digite a matrícula ou nome do funcionário" />
          {
            inputRef.current?.value && (<span onClick={handleClearInput} className="absolute p-1 right-2 material-symbols-outlined rounded-full hover:bg-[#CCCCCC]">
              close
            </span>)
          }
        </div>
      </form>
      {users.length > 0 && (
        <div className="mt-5 text-white bg-[#265d53] rounded-[8px] border p-2 lg:min-w-[600px]">
          <ul>
            {users.map((user, index) => (
              <div>
                <UserEditDialog user={user}>
                  <div className="flex justify-between m-1 p-1 gap-8 cursor-pointer w-[100%]" key={`user-${user.id}-${index}`}>
                    <span color="white">{user.username}</span>
                    <span>{user.name}</span>
                    <span>Status: {user.status ? 'Ativo' : 'Inativo'}</span>
                  </div>
                </UserEditDialog>
                <Separator />
              </div>))
            }
          </ul>
        </div>
      )}
    </div>
  )
}