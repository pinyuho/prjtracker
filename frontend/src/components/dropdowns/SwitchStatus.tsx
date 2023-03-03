import React from "react";

import { TaskStatus } from "../../types";

import useDatabaseApi from "../../hooks/useDatabaseApi";
import useDropdown from "../../hooks/useDropdown";

import LabelStatus from "../utils/LabelStatus";

interface FilterStatusTaskProps {
  issueId: number;
  status: TaskStatus;

  setStatus?: (status: TaskStatus) => void;
  setIsLoading?: (loading: boolean) => void;
  handleTaskStatusChange?: (issueId: number, newStatus: TaskStatus) => void; // for RepoView page
}

const SwitchStatus = ({
  issueId,
  status,
  setStatus,
  setIsLoading,
  handleTaskStatusChange
}: FilterStatusTaskProps) => {
  const { ref, isDropdownOpen, setIsDropdownOpen } = useDropdown();
  const { editTaskStatus } = useDatabaseApi();

  const patchTaskStatus = async (issueId: number, taskStatus: TaskStatus) => {
    await editTaskStatus(issueId, taskStatus);
    if (setIsLoading) setIsLoading(false);
  };

  const handleHeaderClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsDropdownOpen(!isDropdownOpen);
    e.stopPropagation();
  };

  // Handle Options Click
  const handleClick = (taskStatus: TaskStatus) => {
    if (setIsLoading) {
      setIsLoading(true);
    }
    patchTaskStatus(Number(issueId), taskStatus);

    if (handleTaskStatusChange) {
      handleTaskStatusChange(Number(issueId), taskStatus); // for RepoView page
    }
    if (setStatus) {
      setStatus(taskStatus); // for TaskView page
    }
    setIsDropdownOpen(false);
  };

  const handleInProgressClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleClick("in-progress");
    e.stopPropagation();
    // navigate(0); // refresh page: TaskView
  };

  const handleOpenClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleClick("open");
    e.stopPropagation();
    // navigate(0); // refresh page: TaskView
  };

  const handleDoneClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleClick("done");
    e.stopPropagation();
    // navigate(0); // refresh page: TaskView
  };

  return (
    <div ref={ref}>
      {/* Filter Button */}
      <div
        className="ml-1 flex h-7 w-max flex-row justify-between rounded border-zinc-700 bg-transparent px-1 
        text-zinc-300 opacity-80 outline-none ring-0 hover:bg-zinc-700 "
      >
        <button className="h-full w-full" onClick={handleHeaderClick}>
          {status === "" ? (
            <div className="flex w-full justify-center p-0.5">-</div>
          ) : (
            <LabelStatus status={status} />
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
            <LabelStatus status="in-progress" />
          </button>
          <button
            className="rounded px-2 hover:bg-zinc-500"
            onClick={handleOpenClick}
          >
            <LabelStatus status="open" />
          </button>
          <button
            className="rounded px-2 hover:bg-zinc-500"
            onClick={handleDoneClick}
          >
            <LabelStatus status="done" />
          </button>
        </div>
      )}
    </div>
  );
};
export default SwitchStatus;
