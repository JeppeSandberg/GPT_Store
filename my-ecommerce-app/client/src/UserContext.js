import { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <UserContext.Provider value={{ userId, setUserId, username, setUsername, isAdmin, setIsAdmin }}>
      {children}
    </UserContext.Provider>
  );
}