import { createContext, useContext } from 'react';
import { useUserData } from './hooks';

const userContext = createContext();

export const useAuth = () => useContext(userContext);

export default function UserProvider({ children }) {
  const { user, username, status, setUser, setUsername, setStatus } =
    useUserData();
  return (
    <userContext.Provider
      value={{ user, username, status, setUser, setUsername, setStatus }}
    >
      {children}
    </userContext.Provider>
  );
}
