import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BiPlusMedical } from "react-icons/bi";

import { ITask, IRepo, IIssue, TaskStatus, ITaskRaw } from "../types";
import { IconCustom } from "../context/IconContext";

import { ascendingOrder, descendingOrder } from "../utils/sortOrder";

import useModal from "../hooks/useModal";
import useGithubApi from "../hooks/useGithubApi";
import useDatabaseApi from "../hooks/useDatabaseApi";

import TaskFilterBar from "../components/TaskFilterBar";
import TaskList from "../components/TaskList";
import LoadAnimation from "../components/utils/LoadAnimation";
import ModalEdit from "../components/modals/ModalEdit";
import ModalAdd from "../components/modals/ModalAdd";

const RepoView = () => {
  const [repos, setRepos] = useState<IRepo[]>();
  const [statusFilter, setStatusFilter] = useState<TaskStatus>("");
  const [issuesAll, setIssuesAll] = useState<IIssue[]>([]);
  const [issuesFilterd, setIssuesFiltered] = useState<IIssue[]>([]);
  const [isDescending, setIsDescending] = useState<boolean>(true);

  const [tasksStatus, setTasksStatus] = useState<ITaskRaw[]>([]);

  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [editIssueNumber, setEditIssueNumber] = useState(0);

  const [refEditModal, showEditModal, setShowEditModal, handleEditClickModal] =
    useModal();
  const [refAddModal, showAddModal, setShowAddModal, handleDoneClickModal] =
    useModal();

  const { repoOwner, repoName } = useParams();

  const { loading, setLoading, getRepos, getIssues } = useGithubApi();
  const { addTasks, batchReadTasks } = useDatabaseApi();

  const fetchRepos = async () => {
    const data: any = await getRepos();
    setRepos(data);
  };

  const fetchIssues = async (repoOwner: string, repoName: string) => {
    const data: any = await getIssues(repoOwner, repoName);
    setIssuesAll(data);
    console.log("Adding to db...");
    if (data && data.length > 0) {
      await addTasks(
        data.map(
          (issue: IIssue) => ({ issueId: Number(issue.id) } as ITaskRaw) // default: open
        )
      );

      const issueIds = data.map((issue: IIssue) => Number(issue.id));
      const tasks: any = await batchReadTasks(issueIds);
      setTasksStatus(
        tasks.map(
          (task: any) =>
            ({
              issueId: task.issueId,
              status: task.status
            } as ITaskRaw)
        )
      );
    }
  };

  useEffect(() => {
    setLoading(true);
    if (!repos) {
      fetchRepos();
    }
    if (repoOwner && repoName) {
      fetchIssues(repoOwner, repoName);

      console.log("Fetching issues...");
    }
  }, [window.location.pathname]);

  useEffect(() => {
    if (statusFilter !== "") {
      setIssuesFiltered(
        issuesAll?.filter(
          (issue: IIssue) =>
            tasksStatus?.find((item) => item.issueId === issue.id)?.status ===
            statusFilter
        )
      );
    } else setIssuesFiltered(issuesAll);
  }, [statusFilter]);

  return (
    <div className="flex flex-col">
      <TaskFilterBar
        disabled={false}
        repos={repos}
        filterStatus={statusFilter}
        setFilterStatus={setStatusFilter}
        isDescending={isDescending}
        setIsDescending={setIsDescending}
        setIssuesAll={setIssuesAll}
        setLoading={setLoading}
      />

      {loading ? (
        <div
          role="status"
          className="mt-8 flex h-[450px] items-center justify-center"
        >
          <LoadAnimation />
        </div>
      ) : (statusFilter === "" ? issuesAll : issuesFilterd)?.length === 0 ? (
        <div className="mt-8 flex h-[450px] items-center justify-center ">
          <div className="rounded-lg border-2 border-dashed border-zinc-800 py-1 px-4 text-zinc-500">
            There are no issues.
          </div>
        </div>
      ) : (
        <TaskList
          setLoading={setLoading}
          setShowModal={setShowEditModal}
          setEditTitle={setEditTitle}
          setEditBody={setEditBody}
          setEditIssueNumber={setEditIssueNumber}
          tasks={(statusFilter === "" ? issuesAll : issuesFilterd)
            ?.map(
              (issue) =>
                ({
                  issueId: issue.id,
                  title: issue.title,
                  status:
                    tasksStatus?.find((item) => item.issueId === issue.id)
                      ?.status || "",
                  createdTime: issue.created_at,
                  body: issue.body,
                  repo: repoName,
                  number: issue.number
                } as ITask)
            )
            .sort(isDescending ? descendingOrder : ascendingOrder)}
        />
      )}

      {/* Add Task Button */}
      <div
        className="leading-12 fixed right-12 bottom-12 flex h-12 w-12 justify-center rounded-md bg-zinc-700 opacity-60 shadow-lg shadow-black hover:cursor-pointer hover:opacity-90"
        onClick={() => setShowAddModal(true)}
      >
        <IconCustom
          Icon={BiPlusMedical}
          color={"white"}
          className="h-full self-center"
        />
      </div>
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
