import React from "react";

import { ITask, IRepo, TaskStatus } from "../types";

import FilterRepo from "./dropdowns/FilterRepo";
import FilterStatus from "./dropdowns/FilterStatus";
import SearchBox from "./SearchBox";
import ButtonSort from "./buttons/ButtonSort";

import useMobile from "../hooks/useMobile";

interface RepoViewBarProps {
  repos: IRepo[] | undefined;
  filterStatus: TaskStatus;
  setFilterStatus: (status: TaskStatus) => void;

  isDescending: boolean;
  setIsDescending: (isDescending: boolean) => void;

  setIsSearching: (isSearching: boolean) => void;
  setTasksSearched: (tasks: ITask[]) => void;
  setLoading: (loading: boolean) => void;
}

const TaskFilterBar = ({
  repos,
  filterStatus,
  setFilterStatus,

  isDescending,
  setIsDescending,

  setIsSearching,
  setTasksSearched,
  setLoading
}: RepoViewBarProps) => {
  const { isMobile } = useMobile();
  return isMobile ? (
    <div className="mt-[18px] flex w-11/12 flex-col justify-center self-center md:w-[1100px]">
      <div className="flex flex-row">
        <FilterRepo repos={repos} />
        <SearchBox
          setIsSearching={setIsSearching}
          setTasksSearched={setTasksSearched}
          setLoading={setLoading}
          isMobile={isMobile}
        />
      </div>
      <div className="flex flex-row justify-center">
        <div className="mx-1 flex flex-row">
          <div className="my-1 px-2 font-mono text-sm leading-10 text-zinc-500">
            Filter
          </div>
          <FilterStatus
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            isMobile={isMobile}
          />
        </div>

        <div className="mx-1 flex flex-row">
          <div className="my-1 px-1 font-mono text-sm leading-10 text-zinc-500">
            Sorter
          </div>
          <ButtonSort
            isDescending={isDescending}
            setIsDescending={setIsDescending}
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="mt-[18px] flex w-11/12 flex-row justify-center self-center md:w-[1100px]">
      <FilterRepo repos={repos} />
      <FilterStatus
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />
      <SearchBox
        setIsSearching={setIsSearching}
        setTasksSearched={setTasksSearched}
        setLoading={setLoading}
        isMobile={isMobile}
      />
      <ButtonSort
        isDescending={isDescending}
        setIsDescending={setIsDescending}
      />
    </div>
  );
};

export default TaskFilterBar;
