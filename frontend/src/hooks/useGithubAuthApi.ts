import { useState, useEffect } from "react";

import { AxiosError } from "axios";
import agent from "../api/agent";

import { IssueStatus } from "../types";

const useGithubAuthApi = () => {
  const [rerender, setRerender] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loginWithGithub = () => {
    window.location.href = `${process.env.REACT_APP_API_BASE_URL}/auth/github`;
  };

  const logoutBackend = async () => {
    try {
      await agent.post("/auth/logout");
    } catch (error) {
      const err = error as AxiosError;
      console.log("error: ", err.response?.data);
      return err.response?.data;
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await agent.get("/github/user");
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
      const { data } = await agent.get(`/github/repos`);
      // console.log("Repos:", data);
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
        `/github/issues/${username}/${repoName}?per_page=${perPage}&page=${page}`);
      // console.log("Issues:", data);
      // console.log("set loading false");
      setIsLoading(false);

      return data;
    } catch (error) {
      const err = error as AxiosError;
      console.log("error: ", err.response?.data);

      return;
    }
  };

  const getAllIssues = async (
    perPage: number,
    page: number
  ) => {
    try {
      const { data } = await agent.get(
        `/github/issues/all?per_page=${perPage}&page=${page}`);
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
        `/github/issues/${username}/${repoName}/${issueNumber}`);
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
      const { data } = await agent.get(`/github/search/issues/${query}`);
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
        `/github/issue/${username}/${repoName}`,
        {
          title: title,
          body: body
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
    logoutBackend,
    getUserData,
    getRepos,
    getIssues,
    getAllIssues,
    getIssue,
    updateIssue,
    deleteIssue,
    searchIssues,
    addIssue
  };
};

export default useGithubAuthApi;
