import { createContext, useContext } from 'react';
import { useUserData } from './hooks';

const userContext = createContext({});
export const useAuth = () => useContext(userContext);

export default function UserProvider({ children }) {
  return (
    <userContext.Provider value={useUserData()}>
      {children}
    </userContext.Provider>
  );
}
