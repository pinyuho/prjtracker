import React, { createContext, useContext, useState } from "react";

type UserContextType = {
  username: string;
  setUsername: (username: string) => void;
  avatarUrl: string;
  setAvatarUrl: (username: string) => void;
};

export const UserContext = createContext({} as UserContextType);

export const UserProvider = ({ children }: any) => {
  // User Data
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        avatarUrl,
        setAvatarUrl
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
