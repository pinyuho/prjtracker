import React, { useState, useEffect } from "react";
import { TaskStatus } from "../types";
import useDropdown from "../hooks/useDropdown";
import useGithubApi from "../hooks/useGithubApi";

const RepoFilter = () => {
  const [ref, isDropdownOpen, setIsDropdownOpen] = useDropdown();
  const [
    rerender,
    setRerender,
    isLoading,
    setIsLoading,
    loginWithGithub,
    userData,
    getUserData,
    issues,
    getIssues,
    repos,
    getRepos
  ] = useGithubApi();

  useEffect(() => {
    //   setIsLoading(true);
    getRepos();
  }, [userData]);
  return (
    <div ref={ref} className="z-50 mr-3 h-9 self-center">
      <div
        className="w-40 rounded-md bg-[#0000003c] px-6 leading-9 
    opacity-70 shadow-inner shadow-black hover:cursor-pointer hover:opacity-90"
        onClick={() => {
          setIsDropdownOpen(!isDropdownOpen);
          //   getRepos();
        }}
      >
        <div className="w-30 mt-[1px] h-full truncate font-mono text-sm leading-9 text-gray-300">
          choose a repo
        </div>
      </div>

      {/* Filter Dropdown */}
      {isDropdownOpen && (
        <div
          className={`scroll-bar absolute mt-1 overflow-y-scroll rounded-md bg-[#131212] shadow-inner shadow-[#00000099] ${
            repos !== undefined && repos.length <= 4 ? `h-max ` : `h-36 `
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
                  className="h-8 w-full truncate rounded-md py-1 px-4 font-mono text-sm leading-6 text-gray-400 text-opacity-90 hover:cursor-pointer hover:bg-zinc-700 active:bg-zinc-800"
                >
                  {repo.name}
                </div>
              ))}
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default RepoFilter;
