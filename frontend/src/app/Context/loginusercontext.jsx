'use client'
import { createContext, useState } from "react";

// Create the context
export const LoginUserContext = createContext();

// Create a provider component
export const LoginUserProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('user') ? true : false); // Example state

  return (
    <LoginUserContext.Provider value={{ user, setUser }}>
      {children}
    </LoginUserContext.Provider>
  );
};
