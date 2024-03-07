
import { useContext, createContext, useState, useCallback } from "react";

export interface ITokenContext {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export interface ITokenProviderProps {
  children: React.ReactNode;
}

const TokenContext = createContext<ITokenContext>({} as ITokenContext);

export const useTokenContext = () => useContext(TokenContext)


export const TokenProvider: React.FC<ITokenProviderProps> = ({ children }) => {
  const [token, _setToken] = useState<string | null>(localStorage.getItem('token') || null);

  const setToken = useCallback((token: string | null) => {
    _setToken(token);
    localStorage.setItem('token', token!)
  }, [])

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    window.location.reload();
  }

  const value = { token, setToken, logout };

  return <TokenContext.Provider value={value}>
    {children}
  </TokenContext.Provider>;
}