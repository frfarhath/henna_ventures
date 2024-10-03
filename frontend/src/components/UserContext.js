import React, { createContext, useContext, useState } from 'react';

// Create the context
const UserContext = createContext();

// UserProvider component to wrap your app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Example state

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Export the UserContext
export default UserContext;
