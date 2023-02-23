import React, { Dispatch, SetStateAction } from "react";
import { TiDelete } from "react-icons/ti";
import { TaskStatus } from "../types";

import { IconCustom } from "../context/IconContext";

export interface TaskStatusLabelProps {
  status: TaskStatus;

  hoverDelete?: boolean;
  setFilterStatus?: (status: TaskStatus) => void;
  setIsDropdownOpen?: Dispatch<SetStateAction<boolean>>;
}

const TaskStatusLabel = ({
  status,
  hoverDelete,
  setFilterStatus,
  setIsDropdownOpen
}: TaskStatusLabelProps) => {
  const handleDeleteClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (setFilterStatus && setIsDropdownOpen) {
      setFilterStatus("");
      setIsDropdownOpen(false);
    }

    e.stopPropagation();
  };

  switch (status) {
    case "in-progress":
      return (
        <div className="z-50 my-1 flex h-5 w-max select-none  flex-row rounded-md bg-[#314c7b] p-0 sm:p-1">
          <div className="mx-1 h-1.5 w-1.5 self-center rounded-full bg-blue-400"></div>
          <div className="mx-1 h-5 self-center truncate text-ellipsis text-xs font-medium leading-5 text-white">
            In Progress
          </div>
          {hoverDelete && (
            <div className="z-50 flex h-full flex-col justify-center">
              <div onClick={handleDeleteClick}>
                <IconCustom
                  Icon={TiDelete}
                  color={"white"}
                  className="z-50 h-full opacity-50 hover:opacity-70"
                />
              </div>
            </div>
          )}
        </div>
      );
    case "done":
      return (
        <div className="my-1 flex h-5 w-max select-none flex-row truncate rounded-md bg-[#3d7b31aa] p-1">
          <div className="mx-1 h-1.5 w-1.5 self-center rounded-full bg-[#77d56494]"></div>
          <div className="mx-1 h-5 self-center text-xs font-medium leading-5 text-white">
            Done
          </div>
          {hoverDelete && (
            <div className="flex flex-col justify-center">
              <div onClick={handleDeleteClick}>
                <IconCustom
                  Icon={TiDelete}
                  color={"white"}
                  className="opacity-50 hover:opacity-70"
                />
              </div>
            </div>
          )}
        </div>
      );
    case "open":
      return (
        <div className="my-1 flex h-5 w-max select-none flex-row truncate rounded-md bg-[#686239] p-1">
          <div className="mx-1 h-1.5 w-1.5 self-center rounded-full bg-[#ecdb69]"></div>
          <div className="mx-1 h-5 self-center text-xs font-medium leading-5 text-white">
            Open
          </div>
          {hoverDelete && (
            <div className="flex flex-col justify-center">
              <div onClick={handleDeleteClick}>
                <IconCustom
                  Icon={TiDelete}
                  color={"white"}
                  className="opacity-50 hover:opacity-70"
                />
              </div>
            </div>
          )}
        </div>
      );

    default: // none
      return (
        <div className="my-1 flex h-5 w-max select-none flex-row truncate rounded-md bg-[#444444a2] p-1">
          <div className="mx-1 h-5 w-full self-center text-xs font-medium leading-5 text-white">
            -
          </div>
        </div>
      );
  }
};

export default TaskStatusLabel;
