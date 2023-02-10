import React, { useState, useRef } from "react";

import { IconContext } from "react-icons";
import { TiDelete } from "react-icons/ti";

import { useOnClickOutside } from "usehooks-ts";
import useOnHover from "../hooks/useOnHover";

import TaskStatusLabel, { TaskStatus } from "./TaskStatusLabel";

type TaskFilter = TaskStatus | "";

const Filter = () => {
  const ref = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [taskFilter, setTaskFilter] = useState<TaskFilter>("");

  const handleDropdownClick = (taskStatus: TaskStatus) => {
    setTaskFilter(taskStatus);
    setIsDropdownOpen(false);
  };

  useOnClickOutside(ref, () => setIsDropdownOpen(false));

  return (
    <div ref={ref}>
      {/* Filter Button */}
      <div
        className="mt-2 flex h-8 w-28 flex-row justify-between rounded-l-lg border-r-[1px] border-zinc-700 bg-zinc-800 
        text-zinc-300 opacity-80 shadow-sm shadow-zinc-700 outline-none ring-0 hover:bg-zinc-700 sm:w-40"
      >
        <button
          className="h-8 w-full"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {taskFilter === "" ? (
            <div className="flex w-[160px] justify-center p-0.5">-</div>
          ) : (
            <div className="p-0.5 pl-3">
              <TaskStatusLabel status={taskFilter} isButton={false} />
            </div>
          )}
        </button>

        {/* Delete Icon */}
        {taskFilter !== "" && (
          <button
            className="px-1.5"
            onClick={() => {
              setTaskFilter("");
            }}
          >
            <IconContext.Provider
              value={{ color: "grey", className: "global-class-name" }}
            >
              <TiDelete />
            </IconContext.Provider>
          </button>
        )}
      </div>

      {/* Filter Dropdown */}
      {isDropdownOpen && (
        <div className="absolute z-50 mt-2 flex w-28 flex-col rounded-md bg-zinc-700 p-0.5 sm:w-40">
          <button
            className="rounded-md px-2 hover:bg-zinc-500"
            onClick={() => handleDropdownClick("in-progress")}
          >
            <TaskStatusLabel status="in-progress" isButton={false} />
          </button>
          <button
            className="rounded-md px-2 hover:bg-zinc-500"
            onClick={() => handleDropdownClick("open")}
          >
            <TaskStatusLabel status="open" isButton={false} />
          </button>
          <button
            className="rounded-md px-2 hover:bg-zinc-500"
            onClick={() => handleDropdownClick("done")}
          >
            <TaskStatusLabel status="done" isButton={false} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Filter;
