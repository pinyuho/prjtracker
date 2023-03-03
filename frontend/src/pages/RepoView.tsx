import React, { useState, useEffect, useRef, useCallback } from "react";

import { ITask, IRepo, TaskStatus } from "../types";

import { ascendingOrder, descendingOrder } from "../utils/sortOrder";
import Task from "../components/panels/Task";

import useGithubApi from "../hooks/useGithubApi";

import RepoViewBar from "../components/RepoViewBar";
import LoadAnimation from "../components/utils/LoadAnimation";
import ButtonAdd from "../components/buttons/ButtonAdd";
import ModalEdit from "../components/modals/ModalEdit";
import ModalAdd from "../components/modals/ModalAdd";

import useTasks from "../hooks/useTasks";

const RepoView = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [statusFilter, setStatusFilter] = useState<TaskStatus>("");

  const [tasksSearched, setTasksSearched] = useState<ITask[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [tasksFiltered, setTasksFiltered] = useState<ITask[]>([]);
  const {
    tasks,
    hasMore,
    isScrollLoading,
    isLoading,
    setIsLoading,
    handleTaskStatusChange
  } = useTasks(pageNumber);

  const observer = useRef<any>();
  const lastTaskRef = useCallback(
    (node: Node) => {
      if (isScrollLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
          console.log("Current page end.");
        }
      });
      if (node) observer.current.observe(node);
    },
    [isScrollLoading, hasMore]
  );

  const [repos, setRepos] = useState<IRepo[]>();
  const [isDescending, setIsDescending] = useState<boolean>(true);

  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [editIssueNumber, setEditIssueNumber] = useState(0);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const { getRepos } = useGithubApi();

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
        tasks.filter((task: ITask) => task.status === statusFilter)
      );
    } else {
      setTasksFiltered(tasks);
    }
  }, [statusFilter]);

  useEffect(() => {
    if (statusFilter === "") setTasksFiltered(tasks);
  });

  return (
    <div className="flex flex-col">
      <RepoViewBar
        repos={repos}
        filterStatus={statusFilter}
        setFilterStatus={setStatusFilter}
        isDescending={isDescending}
        setIsDescending={setIsDescending}
        setIsSearching={setIsSearching}
        setTasksSearched={setTasksSearched}
        setLoading={setIsLoading}
      />

      {isLoading ? (
        <div
          role="status"
          className="mt-8 flex h-[450px] items-center justify-center"
        >
          <LoadAnimation />
        </div>
      ) : tasksFiltered.length === 0 ? (
        <div className="mt-8 flex h-[450px] items-center justify-center">
          <div className="rounded-lg border-2 border-dashed border-zinc-800 py-1 px-4 text-zinc-500">
            There are no issues.
          </div>
        </div>
      ) : (
        <>
          <div className="mx-8 my-4 grid w-11/12 grid-cols-1 gap-4 self-center sm:grid-cols-2 md:w-[1100px]">
            {(isSearching ? tasksSearched : tasksFiltered)
              .sort(isDescending ? descendingOrder : ascendingOrder)
              .map((task: ITask, index: number) => {
                if (tasksFiltered.length === index + 1) {
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
                      handleTaskStatusChange={handleTaskStatusChange}
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
                      handleTaskStatusChange={handleTaskStatusChange}
                    />
                  );
                }
              })}
          </div>
          {isScrollLoading && (
            <div className="mb-16 text-zinc-400">loading...</div>
          )}
        </>
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
