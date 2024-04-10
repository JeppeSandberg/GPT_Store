import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');

  useEffect(() => {
    localStorage.setItem('userId', userId);
    localStorage.setItem('username', username);
    localStorage.setItem('isAdmin', isAdmin);
  }, [userId, username, isAdmin]);

  return (
    <UserContext.Provider value={{ userId, setUserId, username, setUsername, isAdmin, setIsAdmin }}>
      {children}
    </UserContext.Provider>
  );
}