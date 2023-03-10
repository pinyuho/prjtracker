import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { useParams } from "react-router-dom";

import { BsSearch } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import { MdOutlineKeyboardReturn } from "react-icons/md";

import { IIssue, ITask, ITaskRaw } from "../types";

import { IconCustom } from "../context/IconContext";

import useGithubApi from "../hooks/useGithubApi";
import useDatabaseApi from "../hooks/useDatabaseApi";

interface SearchBoxProps {
  setIsSearching: (isSearching: boolean) => void;
  setTasksSearched: (tasks: ITask[]) => void;
  setLoading: (loading: boolean) => void;
  isMobile: boolean;
  className?: string;
}
const SearchBox = ({
  setIsSearching,
  setTasksSearched,
  setLoading,
  isMobile,
  className
}: SearchBoxProps) => {
  const [inputSearch, setInputSearch] = useState("");
  const { repoOwner, repoName } = useParams();

  const { searchIssues } = useGithubApi();
  const { batchReadTasks } = useDatabaseApi();

  const fetchSearchIssues = async () => {
    const queryString = encodeURIComponent(
      `${inputSearch} is:issue repo:${repoOwner}/${repoName} state:open`
    );

    setLoading(true);

    const data = await searchIssues(queryString);
    const issuesData = data.items;
    if (issuesData.length > 0) {
      const issueIds = issuesData.map((issue: IIssue) => Number(issue.id));
      const tasksStatusData: any = await batchReadTasks(issueIds);
      const tasksData = issuesData.map(
        (issue: IIssue) =>
          ({
            issueId: issue.id,
            title: issue.title,
            status: tasksStatusData.find(
              (task: ITaskRaw) => task.issueId === issue.id
            ).status,
            createdTime: issue.created_at,
            body: issue.body,
            repo: repoName,
            number: issue.number
          } as ITask)
      );
      setTasksSearched(tasksData);
    } else {
      setTasksSearched([]);
    }
    setLoading(false);
  };

  const handleEnterPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      setIsSearching(true);
      fetchSearchIssues();
    }
  };

  const handleEnterClick = () => {
    setIsSearching(true);
    fetchSearchIssues();
  };

  const handleClearSearch = () => {
    setInputSearch("");
    setIsSearching(false);
  };

  const handleInputSearch = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputSearch(event.target.value);
  };

  useEffect(() => {
    if (inputSearch === "") {
      setIsSearching(false);
    }
  }, [inputSearch]);

  return (
    <div
      className={`my-2 mr-2 flex h-8 w-full shrink flex-row ${
        isMobile ? `rounded` : `rounded-r`
      } bg-[#242427] shadow-sm shadow-zinc-700 hover:cursor-text ${className}`}
    >
      {/* Search Icon */}
      <div className="mx-3 flex h-8 flex-col justify-center">
        <IconCustom Icon={BsSearch} color={"grey"} />
      </div>

      {/* Input Field */}
      <input
        className="h-8 w-full bg-transparent text-zinc-200 outline-none ring-0 placeholder:text-sm placeholder:text-zinc-500"
        type="text"
        placeholder="Search..."
        onChange={handleInputSearch}
        value={inputSearch}
        onKeyDown={handleEnterPress}
      />
      {inputSearch?.length > 0 && (
        <button onClick={handleClearSearch}>
          <IconCustom Icon={TiDelete} color={"grey"} />
        </button>
      )}

      {!isMobile && (
        <button
          className={`m-1 rounded bg-zinc-700 px-1 hover:bg-zinc-600 ${
            !inputSearch && "pointer-events-none opacity-30"
          }`}
          onClick={handleEnterClick}
        >
          <div className="flex flex-row">
            <div className="ml-1 w-max font-mono text-xs leading-5 text-white">
              enter
            </div>
            <IconCustom
              Icon={MdOutlineKeyboardReturn}
              color={"white"}
              className="mx-0.5 mt-[1px] h-5"
            />
          </div>
        </button>
      )}
    </div>
  );
};

export default SearchBox;
