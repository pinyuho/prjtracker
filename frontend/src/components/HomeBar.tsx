import React, { useState, Dispatch, SetStateAction } from "react";

import { IIssue, IRepo, TaskStatus } from "../types";

import FilterRepo from "./dropdowns/FilterRepo";
import FilterStatus from "./dropdowns/FilterStatus";
import SearchBox from "./SearchBox";
import ButtonSort from "./buttons/ButtonSort";

interface HomeBarProps {
  repos: IRepo[] | undefined;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const HomeBar = ({ repos, setLoading }: HomeBarProps) => {
  const [filterStatus, setFilterStatus] = useState<TaskStatus>("");
  const [isDescending, setIsDescending] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [issuesAll, setIssuesAll] = useState<IIssue[]>([]);

  return (
    <div className="mt-[18px] flex w-11/12 flex-row justify-center self-center md:w-[1100px]">
      <FilterRepo repos={repos} />
      <FilterStatus
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        className="pointer-events-none opacity-30"
      />
      <SearchBox
        setIssuesAll={setIssuesAll}
        setLoading={setLoading}
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
