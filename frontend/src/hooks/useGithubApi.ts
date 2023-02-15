import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useContext
} from "react";
import { UserContext } from "../context/UserContext";

import { AxiosError } from "axios";
import agent from "../agent";

interface User {
  login: string; // username
  avatar_url: string;
}

interface Issue {
  id: number;
  title: string;
  created_at: Date;
  body: string;
  state: "open" | "closed"; // default: "open"
  labels: string[];
}

interface Repo {
  id: number;
  name: string;
}

const useGithubApi = (): [
  boolean,
  Dispatch<SetStateAction<boolean>>,
  boolean,
  Dispatch<SetStateAction<boolean>>,
  () => void,
  User | undefined,
  () => Promise<void>,
  Issue[] | undefined,
  () => Promise<void>,
  Repo[] | undefined,
  () => Promise<void>
] => {
  const [rerender, setRerender] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<User>();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [repos, setRepos] = useState<Repo[]>([]);

  const { username, setUsername, avatarUrl, setAvatarUrl } =
    useContext(UserContext);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    console.log(codeParam);

    const getAccessToken = async () => {
      try {
        const { data } = await agent.get(
          `/github/access-token?code=${codeParam}`
        );
        console.log("Token: ", data);

        // Set the access token to local storage
        if (data.access_token) {
          localStorage.setItem("accessToken", data.access_token);
          setRerender(!rerender);
        }
      } catch (error) {
        const err = error as AxiosError;
        console.log("error: ", err.response?.data);
        return err.response?.data;
      }
    };

    // Update local storage
    if (codeParam && localStorage.getItem("accessToken") === null) {
      getAccessToken();
    }
  }, []);

  const loginWithGithub = () => {
    const scope = "repo";
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&scope=${scope}`
    );
  };

  const getUserData = async () => {
    try {
      const { data } = await agent.get("/github/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}` // Bearer ACCESSTOKEN,
        }
      });
      console.log("User data: ", data);

      setUserData(data);

      // Set User Context Value
      setUsername(data.login);
      setAvatarUrl(data.avatar_url);

      setIsLoading(false);
      return data;
    } catch (error) {
      const err = error as AxiosError;
      console.log("error: ", err.response?.data);
      return err.response?.data;
    }
  };

  const getIssues = async () => {
    try {
      const { data } = await agent.get("/github/issues", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}` // Bearer ACCESSTOKEN,
        }
      });
      console.log("Issues:", data);
      setIssues(data);
      return data;
    } catch (error) {
      const err = error as AxiosError;
      console.log("error: ", err.response?.data);
      return err.response?.data;
    }
  };

  const getRepos = async () => {
    try {
      const { data } = await agent.get("/github/repos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}` // Bearer ACCESSTOKEN,
        }
      });
      console.log("Repos:", data);
      setRepos(data);
      // setRepos([{ id: 2123, name: "jane" }]);
      return data;
    } catch (error) {
      const err = error as AxiosError;
      console.log("error: ", err.response?.data);
      return err.response?.data;
    }
  };

  return [
    rerender,
    setRerender,
    isLoading,
    setIsLoading,
    loginWithGithub,
    userData,
    getUserData,
    issues,
    getIssues,
    repos,
    getRepos
  ];
};

export default useGithubApi;
