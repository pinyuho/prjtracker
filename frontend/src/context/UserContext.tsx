import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction
} from "react";

type UserContextType = {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  avatarUrl: string;
  setAvatarUrl: Dispatch<SetStateAction<string>>;
};

export const UserContext = createContext({} as UserContextType);
