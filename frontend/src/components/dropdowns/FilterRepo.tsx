import React, { useEffect } from "react";
import { IRepo } from "../../types";

import { useParams } from "react-router-dom";

import useDropdown from "../../hooks/useDropdown";
import DropdownOption from "./DropdownOption";

interface FilterRepoProps {
  repos: IRepo[] | undefined;
}

const FilterRepo = ({ repos }: FilterRepoProps) => {
  const { repoOwner, repoName } = useParams();
  const { ref, isDropdownOpen, setIsDropdownOpen } = useDropdown();

  const allRepo = {
    id: -1,
    name: "all-repos",
    open_issues_count: 0,
  };

  const options = [allRepo, ...(repos ?? [])];

  return (
    <div ref={ref} className="select-none z-10 mr-3 self-center">
      {/* Choose a repo button */}
      <div
        className="w-full h-11 rounded bg-[#0000003c] px-6 leading-9
    opacity-70 shadow-inner shadow-black hover:cursor-pointer hover:opacity-90"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="w-30 h-full truncate font-mono text-sm leading-9 text-gray-300 content-center">
          {window.location.pathname === "/" ? `choose a repo` : `/${repoName}`}
        </div>
      </div>

      {/* Filter Dropdown */}
      {isDropdownOpen && (
      <div
          className={`scroll-bar absolute mt-1 overflow-y-scroll rounded bg-[#131212] shadow-inner shadow-[#00000099] ${
          repos !== undefined && repos.length <= 4 ? `h-max ` : `h-[350px] `
          } ${
          repos !== undefined &&
          repos.find((repo) => repo.name.length > 14) /* overflow */
              ? `w-max `
              : `w-40 `
          }`}
      >
          <div className="flex h-max flex-col p-0.5">
            <>
              {options?.map((repo) => (
                <DropdownOption 
                  key={repo.id}
                  isAllOption={repo.id === -1}
                  repo={repo}
                  setIsDropdownOpen={setIsDropdownOpen}
                />
              ))}
            </>
          </div>
      </div>
      )}
    </div>
  );
};

export default FilterRepo;
