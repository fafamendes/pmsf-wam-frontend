import { useContext, useEffect, useState, createContext } from "react";

import { useTokenContext } from "./TokenContext";
import { me } from "@services/me";


export interface IUserContext {
  user: User | null;
  setUser: (user: User | null) => void;
}

export interface IUserProviderProps {
  children: React.ReactNode;
}

const UserContext = createContext<IUserContext>({} as IUserContext);
export const useUserContext = () => useContext(UserContext);

export const UserProvider: React.FC<IUserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const value = { user, setUser };

  const { token, logout } = useTokenContext();

  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        const { user } = await me(token);
        if (user) setUser(user);
        else {
          setUser(null);
          logout()
        }
      }
      fetchUser();
    }
  }, [token, logout]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

