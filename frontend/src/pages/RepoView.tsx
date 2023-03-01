import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";

import { ITask, IRepo, IIssue, TaskStatus, ITaskRaw } from "../types";

import { ascendingOrder, descendingOrder } from "../utils/sortOrder";
import Task from "../components/panels/Task";

import useGithubApi from "../hooks/useGithubApi";

import RepoViewBar from "../components/RepoViewBar";
import TaskList from "../components/panels/TaskList";
import LoadAnimation from "../components/utils/LoadAnimation";
import ButtonAdd from "../components/buttons/ButtonAdd";
import ModalEdit from "../components/modals/ModalEdit";
import ModalAdd from "../components/modals/ModalAdd";

import useTasks from "../hooks/useTasks";

const RepoView = () => {
  const { repoOwner, repoName } = useParams();
  const [pageNumber, setPageNumber] = useState(1);

  const { tasks, hasMore, isScrollLoading, isError } = useTasks(pageNumber);
  const observer = useRef<any>();
  const lastTaskRef = useCallback(
    (node: Node) => {
      if (isScrollLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isScrollLoading, hasMore]
  );

  const [repos, setRepos] = useState<IRepo[]>();
  const [statusFilter, setStatusFilter] = useState<TaskStatus>("");
  const [tasksFiltered, setTasksFiltered] = useState<ITask[]>([]);
  const [issuesAll, setIssuesAll] = useState<IIssue[]>([]);
  const [isDescending, setIsDescending] = useState<boolean>(true);

  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [editIssueNumber, setEditIssueNumber] = useState(0);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const { isLoading, setIsLoading, getRepos } = useGithubApi();

  useEffect(() => {
    const fetchRepos = async () => {
      const data: any = await getRepos();
      setRepos(data);
    };

    setIsLoading(true);
    if (!repos) {
      fetchRepos();
    }
  }, [window.location.pathname]);

  useEffect(() => {
    if (statusFilter !== "") {
      setTasksFiltered(
        tasks?.filter((task: ITask) => task.status === statusFilter)
      );
    } else setTasksFiltered(tasks);
    console.log("taskss here:", tasks);
  }, [statusFilter]);

  return (
    <div className="flex flex-col">
      <RepoViewBar
        repos={repos}
        filterStatus={statusFilter}
        setFilterStatus={setStatusFilter}
        isDescending={isDescending}
        setIsDescending={setIsDescending}
        setIssuesAll={setIssuesAll} // FIXME: search box
        setLoading={setIsLoading}
      />

      {isLoading ? (
        <div
          role="status"
          className="mt-8 flex h-[450px] items-center justify-center"
        >
          <LoadAnimation />
        </div>
      ) : tasks.length === 0 ? (
        <div className="mt-8 flex h-[450px] items-center justify-center">
          <div className="rounded-lg border-2 border-dashed border-zinc-800 py-1 px-4 text-zinc-500">
            There are no issues.
          </div>
        </div>
      ) : (
        <div className="mx-8 my-4 grid w-11/12 grid-cols-1 gap-4 self-center md:w-[1100px]">
          {tasks
            .sort(isDescending ? descendingOrder : ascendingOrder)
            .map((task: ITask, index: number) => {
              if (tasks.length === index + 1) {
                return (
                  <Task
                    refScroll={lastTaskRef}
                    key={task.issueId}
                    issueId={task.issueId}
                    title={task.title}
                    status={task.status}
                    createdTime={task.createdTime}
                    body={task.body}
                    repo={task.repo}
                    number={task.number}
                    setIsLoading={setIsLoading}
                    setShowEditModal={setShowEditModal}
                    setEditTitle={setEditTitle}
                    setEditBody={setEditBody}
                    setEditIssueNumber={setEditIssueNumber}
                  />
                );
              } else {
                return (
                  <Task
                    key={task.issueId}
                    issueId={task.issueId}
                    title={task.title}
                    status={task.status}
                    createdTime={task.createdTime}
                    body={task.body}
                    repo={task.repo}
                    number={task.number}
                    setIsLoading={setIsLoading}
                    setShowEditModal={setShowEditModal}
                    setEditTitle={setEditTitle}
                    setEditBody={setEditBody}
                    setEditIssueNumber={setEditIssueNumber}
                  />
                );
              }
            })}
        </div>
      )}

      {/* Add Task Button */}
      <ButtonAdd onClick={() => setShowAddModal(!showAddModal)} />
      {showAddModal && <ModalAdd setShowAddModal={setShowAddModal} />}

      {showEditModal && (
        <ModalEdit
          setShowEditModal={setShowEditModal}
          title={editTitle}
          body={editBody}
          issueNumber={editIssueNumber}
        />
      )}
    </div>
  );
};

export default RepoView;
