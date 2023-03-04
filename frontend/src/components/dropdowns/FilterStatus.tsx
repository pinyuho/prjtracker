import React from "react";

import useDropdown from "../../hooks/useDropdown";
import useHover from "../../hooks/useHover";

import LabelStatus from "../utils/LabelStatus";

import { TaskStatus } from "../../types";

interface FilterStatusHeaderProps {
  filterStatus: TaskStatus;
  setFilterStatus: (status: TaskStatus) => void;
  isMobile?: boolean;
  className?: string;
}

const FilterStatus = ({
  filterStatus,
  setFilterStatus,
  isMobile,
  className
}: FilterStatusHeaderProps) => {
  const { ref, isDropdownOpen, setIsDropdownOpen } = useDropdown();
  const [onHover, handleMouseOver, handleMouseOut] = useHover();

  const handleDropdownClick = (taskStatus: TaskStatus) => {
    setFilterStatus(taskStatus);
    setIsDropdownOpen(false);
  };

  const handleClearStatus = (e: React.MouseEvent<HTMLDivElement>) => {
    setFilterStatus("");
    setIsDropdownOpen(false);

    e.stopPropagation();
  };

  return (
    <div ref={ref} className={`${className}`}>
      {/* Filter Button */}
      <div
        className={`my-2 flex h-8 w-max flex-row justify-between ${
          isMobile ? `rounded` : `rounded-l border-r-[1px]`
        }  border-zinc-700 bg-zinc-800 px-4 
        text-zinc-300 opacity-80 shadow-sm shadow-zinc-700 outline-none ring-0 hover:bg-zinc-700`}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <button
          className="flex h-8 w-full justify-center"
          onClick={() => {
            setIsDropdownOpen(!isDropdownOpen);
          }}
        >
          {filterStatus === "" ? (
            <div className="flex w-24 justify-center self-center leading-8">
              -
            </div>
          ) : (
            <div className="flex h-full w-max flex-col justify-center">
              <LabelStatus
                status={filterStatus}
                onHover={onHover}
                handleClearStatus={handleClearStatus}
              />
            </div>
          )}
        </button>
      </div>

      {/* Filter Dropdown */}
      {isDropdownOpen && (
        <div
          className={`absolute z-10 flex w-32 flex-col rounded bg-zinc-700 p-0.5`}
        >
          <div
            className="flex justify-center rounded px-3 hover:bg-zinc-500"
            onClick={() => handleDropdownClick("in-progress")}
          >
            <LabelStatus status="in-progress" />
          </div>
          <button
            className="flex justify-center rounded px-3 hover:bg-zinc-500"
            onClick={() => handleDropdownClick("open")}
          >
            <LabelStatus status="open" />
          </button>
          <button
            className="flex justify-center rounded px-3 hover:bg-zinc-500"
            onClick={() => handleDropdownClick("done")}
          >
            <LabelStatus status="done" />
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterStatus;
