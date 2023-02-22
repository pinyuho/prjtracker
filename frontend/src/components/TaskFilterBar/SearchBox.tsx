import React, {
  useState,
  ChangeEvent,
  KeyboardEvent,
  Dispatch,
  SetStateAction
} from "react";
import { useParams } from "react-router-dom";

import { BsSearch } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import { MdOutlineKeyboardReturn } from "react-icons/md";

import { IIssue } from "../../types";

import { IconCustom } from "../../context/IconContext";

import useGithubApi from "../../hooks/useGithubApi";

interface SearchBoxProps {
  disabled: boolean;
  setIssuesAll: Dispatch<SetStateAction<IIssue[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
const SearchBox = ({ disabled, setIssuesAll, setLoading }: SearchBoxProps) => {
  const [inputSearch, setInputSearch] = useState("");
  const { repoOwner, repoName } = useParams();

  const [
    rerender,
    setRerender,
    loading_,
    setLoading_,
    loginWithGithub,
    getUserData,
    getRepos,
    getIssues,
    getIssue,
    updateIssue,
    deleteIssue,
    searchIssues
  ] = useGithubApi();

  const fetchSearchIssues = async () => {
    const queryString = encodeURIComponent(
      `${inputSearch} is:issue repo:${repoOwner}/${repoName} state:open`
    );

    setLoading(false);
    console.log("Set loading: false");
    const data = await searchIssues(queryString);
    console.log("Search issues", data);
    setIssuesAll(data.items);
  };

  const handleEnterPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      fetchSearchIssues();
      // setInputSearch(""); // TODO: set searchInput into labelComponent
    }
  };

  const handleEnterClick = () => {
    fetchSearchIssues();
  };

  const handleClearSearch = () => {
    const fetchIssues = async (repoOwner: string, repoName: string) => {
      const data: any = await getIssues(repoOwner, repoName);
      setIssuesAll(data);
    };
    setInputSearch("");
    if (repoOwner && repoName) fetchIssues(repoOwner, repoName);
  };

  const handleInputSearch = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputSearch(event.target.value);
  };

  return (
    <div
      className={`my-2 mr-2 flex h-8 w-full shrink flex-row rounded-r bg-zinc-800 opacity-80
      shadow-sm shadow-zinc-700 hover:cursor-text ${
        disabled ? `pointer-events-none opacity-30` : ``
      }`}
    >
      {/* Search Icon */}
      <button className="mx-3 h-8">
        <IconCustom Icon={BsSearch} color={"grey"} />
      </button>

      {/* Input Field */}
      <input
        className="h-8 w-full bg-transparent text-zinc-200 outline-none ring-0 placeholder:text-sm placeholder:text-zinc-500 "
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

      <button
        className={`m-1 rounded bg-zinc-700 px-1 hover:bg-zinc-600 ${
          !inputSearch && "opacity-30"
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
    </div>
  );
};

export default SearchBox;
