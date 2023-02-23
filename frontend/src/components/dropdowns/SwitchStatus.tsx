import React from "react";
import { useNavigate } from "react-router-dom";

import { TaskStatus } from "../../types";

import useDatabaseApi from "../../hooks/useDatabaseApi";
import useDropdown from "../../hooks/useDropdown";

import TaskStatusLabel from "../TaskStatusLabel";

interface FilterStatusTaskProps {
  issueId: number;
  status: TaskStatus;
  setStatus?: (status: TaskStatus) => void;
  setLoading?: (loading: boolean) => void;
}

const SwitchStatus = ({
  issueId,
  status,
  setStatus,
  setLoading
}: FilterStatusTaskProps) => {
  const navigate = useNavigate();
  const { ref, isDropdownOpen, setIsDropdownOpen } = useDropdown();
  const { editTaskStatus } = useDatabaseApi();

  const patchTaskStatus = async (issueId: number, taskStatus: TaskStatus) => {
    await editTaskStatus(issueId, taskStatus);
  };

  // Handle Option Click
  const handleInProgressClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const taskStatus = "in-progress";

    if (setLoading) setLoading(true);
    patchTaskStatus(Number(issueId), taskStatus);
    if (setStatus) setStatus(taskStatus); // for TaskView page
    setIsDropdownOpen(false);
    e.stopPropagation();

    navigate(0); // refresh page: TaskView
  };

  const handleOpenClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const taskStatus = "open";

    if (setLoading) setLoading(true);
    patchTaskStatus(Number(issueId), taskStatus);
    if (setStatus) setStatus(taskStatus); // for TaskView page
    setIsDropdownOpen(false);
    e.stopPropagation();

    navigate(0); // refresh page: TaskView
  };

  const handleDoneClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const taskStatus = "done";

    if (setLoading) setLoading(true);
    patchTaskStatus(Number(issueId), taskStatus);
    if (setStatus) setStatus(taskStatus); // for TaskView page
    setIsDropdownOpen(false);
    e.stopPropagation();

    navigate(0); // refresh page: TaskView
  };

  const handleHeaderClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsDropdownOpen(!isDropdownOpen);
    e.stopPropagation();
  };

  return (
    <div ref={ref}>
      {/* Filter Button */}
      <div
        className="ml-1 flex h-7 w-max flex-row justify-between rounded border-zinc-700 bg-transparent px-1 
        text-zinc-300 opacity-80 outline-none ring-0 hover:bg-zinc-700 "
      >
        <button className=" h-full w-full" onClick={handleHeaderClick}>
          {status === "" ? (
            <div className="flex w-full justify-center p-0.5">-</div>
          ) : (
            <TaskStatusLabel status={status} />
          )}
        </button>
      </div>

      {/* Filter Dropdown */}
      {isDropdownOpen && (
        <div className="absolute mt-1 ml-1 flex w-[132px] flex-col rounded bg-zinc-700 p-0.5">
          <button
            className="rounded px-2 hover:bg-zinc-500"
            onClick={handleInProgressClick}
          >
            <TaskStatusLabel status="in-progress" />
          </button>
          <button
            className="rounded px-2 hover:bg-zinc-500"
            onClick={handleOpenClick}
          >
            <TaskStatusLabel status="open" />
          </button>
          <button
            className="rounded px-2 hover:bg-zinc-500"
            onClick={handleDoneClick}
          >
            <TaskStatusLabel status="done" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SwitchStatus;
