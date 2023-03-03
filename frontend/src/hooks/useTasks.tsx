import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { ITask, IIssue, ITaskRaw, TaskStatus } from "../types";

import useDatabaseApi from "./useDatabaseApi";
import useGithubApi from "./useGithubApi";

const useTasks = (pageNumber: number) => {
  const { repoOwner, repoName } = useParams();
  const [isScrollLoading, setIsScrollLoading] = useState(true);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [hasMore, setHasMore] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const { getIssues } = useGithubApi();
  const { addTasks, batchReadTasks } = useDatabaseApi();

  const handleTaskStatusChange = (issueId: number, newStatus: TaskStatus) => {
    const newTasks = [...tasks];
    const taskToUpdate = newTasks.find(
      (task: ITask) => task.issueId === issueId
    );
    if (taskToUpdate) taskToUpdate.status = newStatus;
    console.log("new tasks:" + newTasks);
    setTasks(newTasks);
  };

  const fetchIssues = async (
    firstFetch: boolean,
    pageNumber: number,
    repoOwner: string,
    repoName: string
  ) => {
    console.log("Fetching issues...");
    const issuesData = await getIssues(repoOwner, repoName, 10, pageNumber);

    if (issuesData.length > 0) {
      const issueIds = issuesData.map((issue: IIssue) => Number(issue.id));
      await addTasks(issueIds); // Add task status to database (default: open)
      const tasksStatusData: any = await batchReadTasks(issueIds);
      const tasksData = issuesData.map(
        (issue: IIssue) =>
          ({
            issueId: issue.id,
            title: issue.title,
            status: tasksStatusData.find(
              (task: ITaskRaw) => task.issueId === issue.id
            ).status,
            createdTime: issue.created_at,
            body: issue.body,
            repo: repoName,
            number: issue.number
          } as ITask)
      );

      // First fetch
      if (firstFetch) setTasks(tasksData);
      // Fetch more
      else setTasks((prevTasks: ITask[]) => [...prevTasks, ...tasksData]);
    }

    setIsLoading(false);

    setIsScrollLoading(false);
    setHasMore(issuesData.length > 0);
    setIsScrollLoading(false);
  };

  useEffect(() => {
    setIsScrollLoading(true);
    if (repoOwner && repoName && pageNumber > 1) {
      fetchIssues(false, pageNumber, repoOwner, repoName);
    }
  }, [pageNumber]);

  useEffect(() => {
    setTasks([]);
    setIsScrollLoading(true);
    setIsLoading(true);
    if (repoOwner && repoName) {
      fetchIssues(true, 1, repoOwner, repoName); // first fetch
    }
  }, [window.location.pathname]);

  return {
    tasks,
    hasMore,
    isScrollLoading,
    isLoading,
    setIsLoading,
    handleTaskStatusChange
  };
};

export default useTasks;
