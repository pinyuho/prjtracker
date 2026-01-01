import React, { createContext, useContext, useEffect, useMemo, useState, useRef } from "react";
import { IRepo } from "../types";

import agent from "../api/agent"; 
import useGithubAuthApi from "../hooks/useGithubAuthApi";

type UserContextType = {
  username: string;
  setUsername: (username: string) => void;
  avatarUrl: string;
  setAvatarUrl: (url: string) => void;
  authLoading: boolean;

  repos: IRepo[];
  reposLoading: boolean;
  refreshRepos: () => Promise<void>;

  loggedIn: boolean;

  refreshMe: () => Promise<void>;
  logout: () => Promise<void>;
};

export const UserContext = createContext({} as UserContextType);

export const UserProvider = ({ children }: any) => {
  const { logoutBackend, getRepos } = useGithubAuthApi();
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const [repos, setRepos] = useState<IRepo[]>([]);
  const [reposLoading, setReposLoading] = useState(false);


  // Function for user data
  const refreshMe = async () => {
    setAuthLoading(true);
    try {
      const { data } = await agent.get("/auth/me");
      // Backend should return：{ loggedIn: boolean, userId?: string, username?: string, avatarUrl?: string }

      setLoggedIn(!!data.loggedIn);
      setUsername(data.username ?? "");
      setAvatarUrl(data.avatarUrl ?? "");
    } catch {
      setLoggedIn(false);
      setUsername("");
      setAvatarUrl("");
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    refreshMe();
  }, []);

  useEffect(() => {
    if (authLoading) return;
    if (!loggedIn) return;

    if (fetchedReposRef.current) return;
    fetchedReposRef.current = true;

    refreshRepos();
}, [authLoading, loggedIn]);

  const logout = async () => {
    try {
      await logoutBackend();
    } catch (e) {
      console.log(e);
    } finally {
      setLoggedIn(false);
      setUsername("");
      setAvatarUrl("");
    }
  };

  // Function for repositories
    // 防止 StrictMode / remount 重複抓
  const fetchedReposRef = useRef(false);

  const refreshRepos = async () => {
    setReposLoading(true);
    try {
      const data = await getRepos();
      setRepos(Array.isArray(data) ? data : []);
    } catch {
      setRepos([]);
    } finally {
      setReposLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      username,
      setUsername,
      avatarUrl,
      setAvatarUrl,
      authLoading,

      repos,
      reposLoading,
      refreshRepos,

      loggedIn,
      refreshMe,
      logout,
    }),
    [username, avatarUrl, loggedIn, authLoading, repos, reposLoading]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
