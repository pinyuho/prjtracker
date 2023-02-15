import React from "react";

import RepoFilter from "./RepoFilter";
import Sorter from "./Sorter";
import StatusFilter from "./StatusFilter";
import SearchBox from "./SearchBox";

const ActionBar = () => {
  return (
    <div className="mt-10 flex w-11/12 flex-row justify-center self-center md:w-[1100px]">
      <RepoFilter />
      <StatusFilter />
      <SearchBox />
      <Sorter />
    </div>
  );
};

export default ActionBar;
