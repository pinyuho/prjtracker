import React, { useEffect } from "react";

import ActionBar from "../components/ActionBar";
import TaskList from "../components/TaskList";

import useGithubApi from "../hooks/useGithubApi";

import { ITask } from "../types";

const Home = () => {
  const [
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
  ] = useGithubApi();

  useEffect(() => {
    setIsLoading(true);
    getIssues();
  }, [userData]);

  return (
    <div className="flex flex-col">
      <ActionBar />
      <TaskList
        tasks={issues?.map(
          (issue) =>
            ({
              id: issue.id,
              title: issue.title,
              status: issue.labels[0],
              createdTime: issue.created_at,
              body: issue.body
            } as ITask)
        )}
      />
    </div>
  );
};

export default Home;
