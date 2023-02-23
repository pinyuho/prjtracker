import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IRepo } from "../../types";

import useDropdown from "../../hooks/useDropdown";
import { useUserContext } from "../../context/UserContext";

interface FilterRepoProps {
  repos: IRepo[] | undefined;
}

const FilterRepo = ({ repos }: FilterRepoProps) => {
  const navigate = useNavigate();
  const { repoOwner, repoName } = useParams();

  const { username } = useUserContext();
  const { ref, isDropdownOpen, setIsDropdownOpen } = useDropdown();

  return (
    <div ref={ref} className="z-10 mr-3 h-9 self-center">
      <div
        className="w-full rounded bg-[#0000003c] px-6 leading-9 
    opacity-70 shadow-inner shadow-black hover:cursor-pointer hover:opacity-90"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="w-30 mt-[1px] h-full truncate font-mono text-sm leading-9 text-gray-300">
          {window.location.pathname === "/" ? `choose a repo` : `/${repoName}`}
        </div>
      </div>
      {/* Filter Dropdown */}
      {isDropdownOpen && (
        <div
          className={`scroll-bar fixed mt-1 overflow-y-scroll rounded bg-[#131212] shadow-inner shadow-[#00000099] ${
            repos !== undefined && repos.length <= 4 ? `h-max ` : `h-[148px] `
          } ${
            repos !== undefined &&
            repos.find((repo) => repo.name.length > 14) /* overflow */
              ? `w-max `
              : `w-40 `
          }`}
        >
          <div className="flex h-max flex-col p-0.5">
            <>
              {repos?.map((repo) => (
                <div
                  key={repo.id}
                  className="flex h-8 w-full flex-row rounded py-1 px-4 font-mono text-sm leading-6 text-gray-400 text-opacity-90 hover:cursor-pointer hover:bg-zinc-700 active:bg-zinc-800"
                  onClick={() => {
                    navigate(`/${username}/${repo.name}`);
                    setIsDropdownOpen(false);
                  }}
                >
                  <div>{repo.name}</div>
                  <div className="mx-2 rounded bg-zinc-800 px-1.5 opacity-50">
                    {repo.open_issues_count}
                  </div>
                </div>
              ))}
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterRepo;
