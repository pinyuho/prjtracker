import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { IIssue, ITask, ITaskRaw, TaskStatus } from "../types";
import useDatabaseApi from "./useDatabaseApi";
import useGithubAuthApi from "./useGithubAuthApi";

const MAX_PER_PAGE = 6;

function parseRepoFromRepositoryUrl(repositoryUrl?: string): string {
  // e.g. https://api.github.com/repos/pinyuho/prjtracker -> "prjtracker"
  if (!repositoryUrl) return "";
  const parts = repositoryUrl.split("/");
  return parts[parts.length - 1] || "";
}

function getRepoNameFromIssue(issue: any): string {
  // priority: backend normalized field -> GitHub /issues repository object -> repository_url
  return (
    issue?.repo ||
    issue?.repository?.name ||
    parseRepoFromRepositoryUrl(issue?.repository_url) ||
    ""
  );
}

const useTasks = (pageNumber: number) => {
  const { repoOwner, repoName } = useParams();
  const { pathname } = useLocation();

  const [tasks, setTasks] = useState<ITask[]>([]);
  const [hasMore, setHasMore] = useState(true);

  // isLoading: 常用來表示「整體 loading」（你原本 UI 用這個顯示大 loading）
  const [isLoading, setIsLoading] = useState(false);

  // isScrollLoading: 用來表示「滾動載入中」
  const [isScrollLoading, setIsScrollLoading] = useState(false);

  const { getIssues, getAllIssues } = useGithubAuthApi();
  const { addTasks, batchReadTasks } = useDatabaseApi();

  // 防止同一時間重複打 API（IntersectionObserver 很容易連觸發）
  const inFlightRef = useRef(false);

  const handleTaskStatusChange = (issueId: number, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.issueId === issueId ? { ...t, status: newStatus } : t))
    );
  };

  const fetchIssues = useCallback(
    async (firstFetch: boolean, page: number, owner: string, name: string) => {
      if (inFlightRef.current) return;
      inFlightRef.current = true;

      // 第一頁：用 isLoading 顯示大 loading；後續頁：用 isScrollLoading 顯示小 loading
      if (firstFetch) setIsLoading(true);
      setIsScrollLoading(!firstFetch);

      try {
        let issuesData: IIssue[] = [];

        if (name === "all-repos") {
          issuesData = (await getAllIssues(MAX_PER_PAGE, page)) ?? [];
        } else {
          issuesData = (await getIssues(owner, name, MAX_PER_PAGE, page)) ?? [];
        }

        if (!Array.isArray(issuesData) || issuesData.length === 0) {
          setHasMore(false);
          return;
        }

        const issueIds = issuesData.map((i) => Number(i.id));
        await addTasks(issueIds);

        const tasksStatusData: ITaskRaw[] = (await batchReadTasks(issueIds)) ?? [];
        const statusMap = new Map<number, TaskStatus>();
        for (const t of tasksStatusData) statusMap.set(t.issueId, t.status);

        const tasksData: ITask[] = issuesData.map((issue: any) => ({
          issueId: issue.id,
          title: issue.title,
          status: statusMap.get(issue.id) ?? TaskStatus.Open,
          createdTime: issue.created_at,
          body: issue.body,
          repo: getRepoNameFromIssue(issue),
          number: issue.number,
        }));

        setTasks((prev) => {
          if (firstFetch) return tasksData;

          // 去重：避免同一筆 issue 因為觸發重抓而重複 append
          const map = new Map<number, ITask>();
          for (const t of prev) map.set(t.issueId, t);
          for (const t of tasksData) map.set(t.issueId, t);
          return Array.from(map.values());
        });

        setHasMore(issuesData.length === MAX_PER_PAGE);
      } finally {
        inFlightRef.current = false;
        setIsLoading(false);
        setIsScrollLoading(false);
      }
    },
    [addTasks, batchReadTasks, getAllIssues, getIssues]
  );

  // ✅ repo / route 變化：reset + 第一頁
  useEffect(() => {
    if (!repoOwner || !repoName) return;

    setTasks([]);
    setHasMore(true);

    // 第一頁抓取
    fetchIssues(true, 1, repoOwner, repoName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, repoOwner, repoName]);

  // ✅ pageNumber 變化：抓下一頁
  useEffect(() => {
    if (!repoOwner || !repoName) return;
    if (pageNumber <= 1) return;
    if (!hasMore) return;

    fetchIssues(false, pageNumber, repoOwner, repoName);
  }, [pageNumber, repoOwner, repoName, hasMore, fetchIssues]);

  return {
    tasks,
    hasMore,
    isScrollLoading,
    isLoading,
    setIsLoading, // 保留給你原本的 TaskFilterBar 引用
    handleTaskStatusChange,
  };
};

export default useTasks;
