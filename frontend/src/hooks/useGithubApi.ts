import { useState, useEffect } from "react";

import { AxiosError } from "axios";
import agent from "../agent";

import { IssueStatus } from "../types";

const useGithubApi = () => {
  const [rerender, setRerender] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    console.log("code param: ", codeParam);

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
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
      console.log("User data: ", data);

      setIsLoading(false);

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
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
      console.log("Repos:", data);
      setIsLoading(false);

      return data;
    } catch (error) {
      const err = error as AxiosError;
      console.log("error: ", err.response?.data);
      return err.response?.data;
    }
  };

  const getIssues = async (
    username: string,
    repoName: string,
    perPage: number,
    page: number
  ) => {
    try {
      const { data } = await agent.get(
        `/github/issues/${username}/${repoName}?per_page=${perPage}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        }
      );
      console.log("Issues:", data);
      setIsLoading(false);

      return data;
    } catch (error) {
      const err = error as AxiosError;
      console.log("error: ", err.response?.data);
      return;
    }
  };

  const getIssue = async (
    username: string,
    repoName: string,
    issueNumber: number
  ) => {
    try {
      const { data } = await agent.get(
        `/github/issues/${username}/${repoName}/${issueNumber}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        }
      );
      console.log("Issue:", data);
      setIsLoading(false);

      return data;
    } catch (error) {
      const err = error as AxiosError;
      console.log("error: ", err.response?.data);
      return err.response?.data;
    }
  };

  const updateIssue = async (
    username: string,
    repoName: string,
    issueNumber: number,
    title: string,
    body: string
  ) => {
    try {
      const { data } = await agent.patch(
        `/github/issues/${username}/${repoName}/${issueNumber}`,
        {
          title: title,
          body: body
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        }
      );
      console.log("Updated Issue:", data);
      setIsLoading(false);

      return data;
    } catch (error) {
      const err = error as AxiosError;
      console.log("error: ", err.response?.data);
      return err.response?.data;
    }
  };

  const deleteIssue = async (
    username: string,
    repoName: string,
    issueNumber: number,
    state: IssueStatus
  ) => {
    try {
      const { data } = await agent.patch(
        `/github/issues/${username}/${repoName}/${issueNumber}`,
        {
          state: state
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        }
      );
      console.log("Deleted Issue:", data);
      setIsLoading(false);

      return data;
    } catch (error) {
      const err = error as AxiosError;
      console.log("error: ", err.response?.data);
      return err.response?.data;
    }
  };

  const searchIssues = async (query: string) => {
    try {
      const { data } = await agent.get(`/github/search/issues/${query}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          // Accept: "application/vnd.github.text-match+json" // FIXME: text-match hightlight
        }
      });
      console.log("Searched Issue:", data);
      setIsLoading(false);

      return data;
    } catch (error) {
      const err = error as AxiosError;
      console.log("error: ", err.response?.data);
      return err.response?.data;
    }
  };

  const addIssue = async (
    username: string,
    repoName: string,
    title: string,
    body: string
  ) => {
    try {
      const { data } = await agent.post(
        `/github/issues/${username}/${repoName}`,
        {
          title: title,
          body: body
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        }
      );
      console.log("Added Issue:", data);
      setIsLoading(false);

      return data;
    } catch (error) {
      const err = error as AxiosError;
      console.log("error: ", err.response?.data);
      return err.response?.data;
    }
  };

  return {
    rerender,
    setRerender,
    isLoading,
    setIsLoading,
    loginWithGithub,
    getUserData,
    getRepos,
    getIssues,
    getIssue,
    updateIssue,
    deleteIssue,
    searchIssues,
    addIssue
  };
};

export default useGithubApi;
