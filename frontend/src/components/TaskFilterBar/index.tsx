import React, { Dispatch, SetStateAction } from "react";

import { IIssue, IRepo, TaskStatus } from "../../types";

import FilterRepo from "./FilterRepo";
import FilterStatus from "./FilterStatus";
import SearchBox from "./SearchBox";
import Sorter from "./Sorter";

interface ActionBarProps {
  disabled: boolean;
  repos: IRepo[] | undefined;
  filterStatus: TaskStatus;
  setFilterStatus: (status: TaskStatus) => void;

  isDescending: boolean;
  setIsDescending: Dispatch<SetStateAction<boolean>>;

  setIssuesAll: Dispatch<SetStateAction<IIssue[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const TaskFilterBar = ({
  disabled,
  repos,
  filterStatus,
  setFilterStatus,

  isDescending,
  setIsDescending,

  setIssuesAll,
  setLoading
}: ActionBarProps) => {
  return (
    <div className="mt-[18px] flex w-11/12 flex-row justify-center self-center md:w-[1100px]">
      <FilterRepo repos={repos} />
      <FilterStatus
        disabled={disabled}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />
      <SearchBox
        disabled={disabled}
        setIssuesAll={setIssuesAll}
        setLoading={setLoading}
      />
      <Sorter
        disabled={disabled}
        isDescending={isDescending}
        setIsDescending={setIsDescending}
      />
    </div>
  );
};

export default TaskFilterBar;
