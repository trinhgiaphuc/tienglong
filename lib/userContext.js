import { createContext, useContext } from 'react';
import { useUserData } from './hooks';

const userContext = createContext();

export const useAuth = () => useContext(userContext);

export default function UserProvider({ children }) {
  const userData = useUserData();
  return (
    <userContext.Provider value={userData}>{children}</userContext.Provider>
  );
}
