
import { Input } from "@/components/ui/input"
import { useCallback, useState, useRef } from "react"

import { searchByString } from "@services/searchByString";
import { useTokenContext } from "@context/TokenContext";
import { Separator } from "@/components/ui/separator";
import { UserEditDialog } from "@components/user-edit-dialog/UserEditDialog";

import { SearchSkeleton } from './SearchSkeleton';
import { AxiosError } from "axios";

export const SearchUsers = () => {

  const [users, setUsers] = useState<User[]>([]);
  const { token } = useTokenContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

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

      setIsLoading(true);
      searchByString(search, 10, token!).then((response: UsersResponse) => {
        setUsers(response.users);
        setIsLoading(false);
      }).catch((e) => {
        const error = e as AxiosError;
        setIsLoading(false);
        console.log(error);
      })
    }

    fetchUsers();
  }, [token]);

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
      {
        ((inputRef.current?.value.length! > 0 && users.length > 0) || isLoading) ? (
          <div className="mt-5 text-white bg-[#265d53] rounded-[8px] border p-2 lg:min-w-[600px]">
            <ul>
              {
                isLoading ? <SearchSkeleton count={5} /> : users.map((user, index) => (
                  <li key={`user-${user.id}-${index}`}>
                    <UserEditDialog user={user}>
                      <div className="flex justify-between m-1 p-1 gap-8 cursor-pointer w-[100%]">
                        <span color="white">{user.username}</span>
                        <span>{user.name}</span>
                        <span>Status: {user.status ? 'Ativo' : 'Inativo'}</span>
                      </div>
                    </UserEditDialog>
                    <Separator />
                  </li>
                ))
              }
            </ul>
          </div>
        ) :
          (inputRef.current?.value.length! > 0 && users.length === 0 && !isLoading) &&
          <div>
            Nenhum usuário encotrado
          </div>
      }
    </div>
  )
}