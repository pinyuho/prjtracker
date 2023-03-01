import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { ITask, IIssue, ITaskRaw } from "../types";

import useDatabaseApi from "./useDatabaseApi";
import useGithubApi from "./useGithubApi";

const useTasks = (pageNumber: number) => {
  const { repoOwner, repoName } = useParams();
  const [isScrollLoading, setIsScrollLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [hasMore, setHasMore] = useState(false);

  const { getIssues } = useGithubApi();
  const { addTasks, batchReadTasks } = useDatabaseApi();

  const fetchIssues = async (
    firstFetch: boolean,
    pageNumber: number,
    repoOwner: string,
    repoName: string
  ) => {
    const data = await getIssues(repoOwner, repoName, 10, pageNumber);
    const issuesData = data.filter(
      (issue: IIssue) => !tasks.map((task) => task.issueId).includes(issue.id) // Do not add duplicate tasks
    );

    const issueIds = issuesData.map((issue: IIssue) => Number(issue.id));
    await addTasks(issueIds); // Add task status to database (default: open)
    const tasksData: any = await batchReadTasks(issueIds);

    if (firstFetch) {
      setTasks(
        issuesData.map(
          (issue: IIssue) =>
            ({
              issueId: issue.id,
              title: issue.title,
              status: tasksData.find(
                (task: ITaskRaw) => task.issueId === issue.id
              ).status,
              createdTime: issue.created_at,
              body: issue.body,
              repo: repoName,
              number: issue.number
            } as ITask)
        )
      );
    } else {
      // Fetch more
      setTasks((prevTasks: ITask[]) => [
        ...prevTasks,
        ...issuesData.map(
          (issue: IIssue) =>
            ({
              issueId: issue.id,
              title: issue.title,
              status: tasksData.find(
                (task: ITaskRaw) => task.issueId === issue.id
              ).status,
              createdTime: issue.created_at,
              body: issue.body,
              repo: repoName,
              number: issue.number
            } as ITask)
        )
      ]);
    }
    console.log("issue data length: " + issuesData.length);
    setIsScrollLoading(false);
    setHasMore(issuesData.length > 0);
    setIsScrollLoading(false);
  };

  useEffect(() => {
    setIsScrollLoading(true);
    // setIsError(false);
    if (repoOwner && repoName && pageNumber > 1)
      fetchIssues(false, pageNumber, repoOwner, repoName);
  }, [pageNumber]);

  useEffect(() => {
    setTasks([]);
    setIsScrollLoading(true);
    // setIsError(false);
    if (repoOwner && repoName) fetchIssues(true, 1, repoOwner, repoName); // first fetch
  }, [window.location.pathname]);

  return { tasks, hasMore, isScrollLoading, isError };
};

export default useTasks;
