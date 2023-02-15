import React from "react";

import { TaskStatus } from "../types";

export interface TaskStatusLabelProps {
  status: TaskStatus;
  isButton: boolean;
}

const TaskStatusLabel = ({ status, isButton }: TaskStatusLabelProps) => {
  switch (status) {
    case "open":
      return (
        <div
          className={`my-1 flex h-5 w-16 select-none flex-row truncate rounded-md bg-[#686239] p-1 ${
            isButton && `hover:cursor-pointer hover:bg-[#91884e]`
          }`}
        >
          <div className="mx-1 h-1.5 w-1.5 self-center rounded-full bg-[#ecdb69]"></div>
          <div className="mx-1 h-5 self-center text-xs font-medium leading-5 text-white">
            Open
          </div>
        </div>
      );
    case "in-progress":
      return (
        <div
          className={`my-1 flex h-5 w-24 select-none  flex-row rounded-md bg-[#314c7b] p-0 sm:p-1 ${
            isButton && `hover:cursor-pointer hover:bg-[#3f629e]`
          }`}
        >
          <div className="mx-1 h-1.5 w-1.5 self-center rounded-full bg-blue-400"></div>
          <div className="mx-1 h-5 self-center truncate text-ellipsis text-xs font-medium leading-5 text-white">
            In Progress
          </div>
        </div>
      );
    default: // Done
      return (
        <div
          className={`my-1 flex h-5 w-16 select-none flex-row truncate rounded-md bg-[#3d7b31aa] p-1 ${
            isButton && `hover:cursor-pointer hover:bg-[#4fa03f77]`
          }`}
        >
          <div className="mx-1 h-1.5 w-1.5 self-center rounded-full bg-[#77d56494]"></div>
          <div className="mx-1 h-5 self-center text-xs font-medium leading-5 text-white">
            Done
          </div>
        </div>
      );
  }
};

export default TaskStatusLabel;
