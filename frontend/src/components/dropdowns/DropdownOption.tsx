import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

import { IRepo } from "../../types";

interface DropdownOptionProps {
    isAllOption: boolean;
    repo: IRepo;
    setIsDropdownOpen: (isDropdownOpen: boolean) => void;
}

const DropdownOption = ({ isAllOption, repo, setIsDropdownOpen }: DropdownOptionProps) => {
    const { username } = useUserContext();
    const navigate = useNavigate();

    return isAllOption ? 
        <div
            className="select-none w-full rounded p-[2px] hover:cursor-pointer hover:bg-zinc-700 active:bg-zinc-800"
            onClick={() => {
                navigate(`/${username}/${repo.name}`);
                setIsDropdownOpen(false);
            }}
        >
            <div className="flex h-10 items-center rounded border border-dashed border-gray-500/60 px-4 font-mono text-sm leading-6 text-gray-400/90">
                <div>{repo.name}</div>
            </div>
        </div>
        :
        <div
            className="content-center select-none flex h-10 w-full flex-row rounded py-1 px-4 font-mono text-sm leading-6 text-gray-400 text-opacity-90 hover:cursor-pointer hover:bg-zinc-700 active:bg-zinc-800"
            onClick={() => {
                navigate(`/${username}/${repo.name}`);
                setIsDropdownOpen(false);
            }}
        >
            <div className="content-center">{repo.name}</div>
            <div className="content-center mx-2 rounded bg-zinc-800 px-1.5 opacity-50">
                {repo.open_issues_count}
            </div>
        </div> 
    ;
};

export default DropdownOption;
