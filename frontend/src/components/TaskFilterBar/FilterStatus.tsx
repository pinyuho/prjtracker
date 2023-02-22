import React from "react";

import useDropdown from "../../hooks/useDropdown";
import useOnHover from "../../hooks/useOnHover";

import TaskStatusLabel from "../utils/TaskStatusLabel";

import { TaskStatus } from "../../types";

interface FilterStatusHeaderProps {
  disabled: boolean;
  filterStatus: TaskStatus;
  setFilterStatus: (status: TaskStatus) => void;
}

const FilterStatus = ({
  disabled,
  filterStatus,
  setFilterStatus
}: FilterStatusHeaderProps) => {
  const [ref, isDropdownOpen, setIsDropdownOpen] = useDropdown();
  const [onHover, handleMouseOver, handleMouseOut] = useOnHover();

  const handleDropdownClick = (taskStatus: TaskStatus) => {
    setFilterStatus(taskStatus);
    setIsDropdownOpen(false);
  };

  return (
    <div
      ref={ref}
      className={`${disabled && `pointer-events-none opacity-30`}`}
    >
      {/* Filter Button */}
      <div
        className="mt-2 flex h-8 w-max flex-row justify-between rounded-l border-r-[1px] border-zinc-700 bg-zinc-800 px-4 
        text-zinc-300 opacity-80 shadow-sm shadow-zinc-700 outline-none ring-0 hover:bg-zinc-700 "
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <button
          className="flex h-8 w-full justify-center"
          onClick={() => {
            setIsDropdownOpen(!isDropdownOpen);
            console.log("Big button triggered.");
          }}
        >
          {filterStatus === "" ? (
            <div className="flex w-24 justify-center self-center leading-8">
              -
            </div>
          ) : (
            <div className="flex h-full w-max flex-col justify-center">
              <TaskStatusLabel
                status={filterStatus}
                hoverDelete={onHover}
                setFilterStatus={setFilterStatus}
                setIsDropdownOpen={setIsDropdownOpen}
              />
            </div>
          )}
        </button>
      </div>

      {/* Filter Dropdown */}
      {isDropdownOpen && (
        <div
          className={`absolute z-10 mt-2 flex w-32 flex-col rounded bg-zinc-700 p-0.5`}
        >
          <div
            className="flex justify-center rounded px-3 hover:bg-zinc-500"
            onClick={() => handleDropdownClick("in-progress")}
          >
            <TaskStatusLabel status="in-progress" />
          </div>
          <button
            className="flex justify-center rounded px-3 hover:bg-zinc-500"
            onClick={() => handleDropdownClick("open")}
          >
            <TaskStatusLabel status="open" />
          </button>
          <button
            className="flex justify-center rounded px-3 hover:bg-zinc-500"
            onClick={() => handleDropdownClick("done")}
          >
            <TaskStatusLabel status="done" />
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterStatus;
