import React from "react";
import Sorter from "./Sorter";
import Filter from "./Filter";
import SearchBox from "./SearchBox";

const ActionBar = () => {
  return (
    <div className="mt-10 flex w-11/12 flex-row justify-center self-center md:w-[910px]">
      <Sorter />
      <Filter />
      <SearchBox />
    </div>
  );
};

export default ActionBar;
