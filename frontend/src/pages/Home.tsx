import React, { useState, useEffect } from "react";

import { IRepo, TaskStatus, IIssue } from "../types";

import { useUserContext } from "../context/UserContext";
import useGithubApi from "../hooks/useGithubApi";

import TaskFilterBar from "../components/TaskFilterBar/index";

const Home = () => {
  const { username, setUsername, avatarUrl, setAvatarUrl } = useUserContext();

  const [repos, setRepos] = useState<IRepo[]>();
  const [status, setStatus] = useState<TaskStatus>("");
  const [isDescending, setIsDescending] = useState<boolean>(true);
  const [issuesAll, setIssuesAll] = useState<IIssue[]>([]);

  const [
    rerender,
    setRerender,
    loading,
    setLoading,
    loginWithGithub,
    getUserData,
    getRepos,
    getIssues
  ] = useGithubApi();

  useEffect(() => {
    const fetchUser = async () => {
      const data: any = await getUserData();
      setUsername(data.login);
      setAvatarUrl(data.avatar_url);
    };

    const fetchRepos = async () => {
      const data: any = await getRepos();
      setRepos(data);
    };

    setLoading(true);
    if (username === "") {
      fetchUser();
    }
    if (username) {
      fetchRepos();
    }
  }, []);

  return (
    <div className="flex flex-col">
      <TaskFilterBar
        disabled={true}
        repos={repos}
        filterStatus={status}
        setFilterStatus={setStatus}
        isDescending={isDescending}
        setIsDescending={setIsDescending}
        setIssuesAll={setIssuesAll}
        setLoading={setLoading}
      />
      <div className="mt-8 flex h-[450px] items-center justify-center">
        <div className="rounded-lg border-2 border-dashed border-zinc-800 py-1 px-4 text-zinc-500">
          Please choose a repository.
        </div>
      </div>
    </div>
  );
};

export default Home;
