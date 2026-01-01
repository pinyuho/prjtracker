import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { ITask, TaskStatus } from "../types";
import { ascendingOrder, descendingOrder } from "../utils/sortOrder";
import { useUserContext } from "../context/UserContext";

import useTasks from "../hooks/useTasks";

import TaskFilterBar from "../components/TaskFilterBar";
import Task from "../components/panels/Task";

import LoadAnimation from "../components/utils/LoadAnimation";
import ButtonAdd from "../components/buttons/ButtonAdd";
import ModalEdit from "../components/modals/ModalEdit";
import ModalAdd from "../components/modals/ModalAdd";

const RepoView = () => {
  const { repoOwner, repoName } = useParams();
  const { repos } = useUserContext();

  const [pageNumber, setPageNumber] = useState(1);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | null>(null);

  const [tasksSearched, setTasksSearched] = useState<ITask[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const [isDescending, setIsDescending] = useState(true);

  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [editIssueNumber, setEditIssueNumber] = useState(0);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // ✅ repo 切換就 reset page（很重要）
  useEffect(() => {
    setPageNumber(1);
    setIsSearching(false);
    setTasksSearched([]);
  }, [repoOwner, repoName]);

  const {
    tasks,
    hasMore,
    isScrollLoading,
    isLoading: isTaskLoading,
    setIsLoading: setIsTaskLoading,
    handleTaskStatusChange,
  } = useTasks(pageNumber);

  // ✅ 不要用 state + effect 去 setTasksFiltered，直接 derived（更乾淨也少一次 render）
  const tasksFiltered = useMemo(() => {
    if (!statusFilter) return tasks;
    return tasks.filter((t) => t.status === statusFilter);
  }, [tasks, statusFilter]);

  const renderList = useMemo(() => {
    const base = isSearching ? tasksSearched : tasksFiltered;
    return base.slice().sort(isDescending ? descendingOrder : ascendingOrder);
  }, [isSearching, tasksSearched, tasksFiltered, isDescending]);

  // ✅ sentinel observer（最穩）
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lockRef = useRef(false);

  // 當 scroll loading 結束，解除鎖
  useEffect(() => {
    if (!isScrollLoading) lockRef.current = false;
  }, [isScrollLoading]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (!first?.isIntersecting) return;

      // ✅ guard
      if (!hasMore) return;
      if (isTaskLoading || isScrollLoading) return;
      if (lockRef.current) return;

      lockRef.current = true;
      setPageNumber((p) => p + 1);
    });

    observerRef.current.observe(el);

    return () => observerRef.current?.disconnect();
  }, [hasMore, isTaskLoading, isScrollLoading]);

  return (
    <div className="flex flex-col">
      <TaskFilterBar
        repos={repos}
        filterStatus={statusFilter}
        setFilterStatus={setStatusFilter}
        isDescending={isDescending}
        setIsDescending={setIsDescending}
        setIsSearching={setIsSearching}
        setTasksSearched={setTasksSearched}
        setLoading={setIsTaskLoading}
      />

      {isTaskLoading ? (
        <div role="status" className="mt-8 flex h-[450px] items-center justify-center">
          <LoadAnimation />
        </div>
      ) : tasksFiltered.length === 0 || (isSearching && tasksSearched.length === 0) ? (
        <div className="mt-8 flex h-[450px] items-center justify-center">
          <div className="rounded-lg border-2 border-dashed border-zinc-800 py-1 px-4 text-zinc-500">
            There are no issues.
          </div>
        </div>
      ) : (
        <>
          <div className="mx-8 my-4 grid w-11/12 grid-cols-1 gap-4 self-center sm:grid-cols-2 md:w-[1100px]">
            {renderList.map((task: ITask) => (
              <Task
                showRepo={repoName === "all-repos"}
                key={task.issueId}
                issueId={task.issueId}
                title={task.title}
                status={task.status}
                createdTime={task.createdTime}
                body={task.body}
                repo={task.repo}
                number={task.number}
                setIsLoading={setIsTaskLoading}
                setShowEditModal={setShowEditModal}
                setEditTitle={setEditTitle}
                setEditBody={setEditBody}
                setEditIssueNumber={setEditIssueNumber}
                handleTaskStatusChange={handleTaskStatusChange}
              />
            ))}
          </div>

          {/* ✅ sentinel 放在列表底部 */}
          <div ref={sentinelRef} style={{ height: 1 }} />

          {isScrollLoading && <div className="mb-16 text-zinc-400">loading...</div>}
        </>
      )}

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
