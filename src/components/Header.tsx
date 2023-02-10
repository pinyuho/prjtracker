import React from "react";
import { useNavigate } from "react-router-dom";

import { IconContext } from "react-icons";
import { FiGithub } from "react-icons/fi";

import { getUsers } from "../api/users";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-16 flex-row justify-between bg-zinc-800 drop-shadow-md">
      {/* Project Title */}
      <div
        className="h-16 p-3 pl-6 font-mono text-xl font-bold leading-10 text-white hover:cursor-pointer"
        onClick={() => navigate("/", { replace: true })}
      >
        prjtracker
      </div>

      {/* Github Connection Button */}
      <div className="mr-4 flex h-8 w-28 flex-row justify-center self-center rounded-full bg-zinc-200 p-3 hover:cursor-pointer hover:bg-zinc-100">
        <IconContext.Provider
          value={{ color: "grey", className: "global-class-name" }}
        >
          <FiGithub className="ml-1 h-4 w-4 self-center opacity-70" />
        </IconContext.Provider>

        <div
          className="select-none self-center p-2 font-mono text-sm text-zinc-400"
          onClick={() => console.log(getUsers())}
        >
          LOGIN
        </div>
      </div>
    </div>
  );
};

export default Header;
