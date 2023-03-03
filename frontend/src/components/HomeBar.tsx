import React, { useState } from "react";

import { ITask, IRepo, TaskStatus } from "../types";

import FilterRepo from "./dropdowns/FilterRepo";
import FilterStatus from "./dropdowns/FilterStatus";
import SearchBox from "./SearchBox";
import ButtonSort from "./buttons/ButtonSort";

import useMobile from "../hooks/useMobile";

interface HomeBarProps {
  repos: IRepo[] | undefined;
  setIsLoading: (loading: boolean) => void;
}

const HomeBar = ({ repos, setIsLoading: setLoading }: HomeBarProps) => {
  const [filterStatus, setFilterStatus] = useState<TaskStatus>("");
  const [isDescending, setIsDescending] = useState<boolean>(true);
  const [tasksSearched, setTasksSearched] = useState<ITask[]>([]);
  const [isSearching, setIsSearching] = useState(false);

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
          className="pointer-events-none opacity-30"
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
            className="pointer-events-none opacity-30"
          />
        </div>

        <div className="mx-1 flex flex-row">
          <div className="my-1 px-1 font-mono text-sm leading-10 text-zinc-500">
            Sorter
          </div>
          <ButtonSort
            isDescending={isDescending}
            setIsDescending={setIsDescending}
            className="pointer-events-none opacity-30"
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
        isMobile={isMobile}
        className="pointer-events-none opacity-30"
      />
      <SearchBox
        setIsSearching={setIsSearching}
        setTasksSearched={setTasksSearched}
        setLoading={setLoading}
        isMobile={isMobile}
        className="pointer-events-none opacity-30"
      />
      <ButtonSort
        isDescending={isDescending}
        setIsDescending={setIsDescending}
        className="pointer-events-none opacity-30"
      />
    </div>
  );
};

export default HomeBar;
