
import { Input } from "@/components/ui/input"
import { useCallback, useState } from "react"

import { usersByUsername } from "@services/usersByUsername";
import { usersByName } from "@services/usersByName";
import { useTokenContext } from "@context/TokenContext";

export const SearchUsers = () => {

  const [users, setUsers] = useState<User[]>([]);
  const { token } = useTokenContext();

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const fetchUsers = async () => {

      const search = event.target.value.replaceAll(/[^\w\s]/gi, '');
      event.target.value = search;

      if (!search) {
        setUsers([]);
        return;
      }

      const usersByNameList: UsersRequest = await usersByName(search, 20, token!);
      const usersByUsernameList: UsersRequest = await usersByUsername(search, 20, token!);

      setUsers([...usersByNameList.users, ...usersByUsernameList.users]);
    }
    fetchUsers();
  }, [token])

  return (
    <div>

      <form action="">
        <Input className="uppercase w-[500px] padding-x-4" onChange={handleSearch} placeholder="Digite a matrícula ou nome" />
      </form>
      {users.map((user, index) => (
        <div className="flex gap-4" key={`user-${user.id}-${index}`}>
          <span>{user.username}</span>
          <span>{user.name}</span>
          <span>Status:{user.status ? 'Ativo' : 'Inativo'}</span>
        </div>
      ))}
    </div>
  )
}