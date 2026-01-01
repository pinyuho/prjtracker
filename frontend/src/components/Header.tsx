import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FiGithub, FiLogOut } from "react-icons/fi";
import { IconCustom } from "../context/IconContext";

import useGithubAuthApi from "../hooks/useGithubAuthApi";
import { useUserContext } from "../context/UserContext";

const Header = () => {
  const navigate = useNavigate();
  const { loginWithGithub } = useGithubAuthApi();

  const { username, avatarUrl, loggedIn, authLoading, logout } = useUserContext();

  const clickLogout = async () => {
    await logout();
  };

  if (authLoading) {
    return (
      <div className="flex h-16 w-full flex-row justify-between bg-zinc-800 drop-shadow-md">
        <div className="select-none text-md flex flex-col self-center pl-4 font-mono font-bold text-white sm:pl-7 sm:text-xl">
          prjtracker
        </div>
        <div className="mx-4 self-center font-mono text-sm text-zinc-400">loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-16 w-full flex-row justify-between bg-zinc-800 drop-shadow-md">
      {/* Project Title */}
      <div
        className="select-none text-md flex flex-col self-center pl-4 font-mono font-bold text-white hover:cursor-pointer sm:pl-7 sm:text-xl"
        onClick={() => navigate("/")}
      >
        prjtracker
      </div>

      {loggedIn ? (
        <div className="flex w-max flex-row justify-center self-center">
          <div className="mx-2 font-mono text-sm leading-9 text-zinc-200">
            <div className="flex flex-row">
              {/* User Information */}
              <img
                className="mx-[5px] mt-0.5 h-5 w-5 self-center rounded-full"
                src={avatarUrl}
              />
              <div>{username}</div>

              {/* Logout Icon */}
              <div
                className="mt-1 h-7 w-7 opacity-20 hover:cursor-pointer hover:opacity-80"
                onClick={clickLogout}
              >
                <IconCustom
                  Icon={FiLogOut}
                  color={"white"}
                  className="ml-0.5 mt-1.5 h-4 w-full self-center opacity-70"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button className=" mr-4 flex h-8 w-28 flex-row justify-center self-center rounded-full bg-zinc-200 hover:cursor-pointer hover:bg-zinc-100 active:bg-zinc-300 disabled:pointer-events-none disabled:opacity-30">
          <IconCustom
            Icon={FiGithub}
            color={"grey"}
            className="ml-1 h-8 w-4 opacity-70"
          />

          <div
            className="select-none self-center p-2 font-mono text-sm text-zinc-400"
            onClick={loginWithGithub}
          >
            LOGIN
          </div>
        </button>
      )}
    </div>
  );
};

export default Header;
