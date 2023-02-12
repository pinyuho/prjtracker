import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { IconContext } from "react-icons";
import { FiGithub, FiLogOut } from "react-icons/fi";

import useGithubApi from "../hooks/useGithubApi";

interface HeaderProps {
  isLoggedIn: boolean;
}

const Header = ({ isLoggedIn }: HeaderProps) => {
  const navigate = useNavigate();
  const [
    rerender,
    setRerender,
    isLoading,
    setIsLoading,
    loginWithGithub,
    userData,
    getUserData
  ] = useGithubApi();

  useEffect(() => {
    console.log("sense logged in change");
    setIsLoading(true);
    getUserData();
  }, [localStorage.getItem("accessToken")]);

  return (
    <div className="flex-row flex h-16 justify-between bg-zinc-800 drop-shadow-md">
      {/* Project Title */}
      <div
        className="h-16 p-3 pl-6 font-mono text-xl font-bold leading-10 text-white hover:cursor-pointer"
        onClick={() => navigate("/", { replace: true })}
      >
        prjtracker
      </div>

      {isLoggedIn ? (
        <div className="flex-row flex w-max self-center">
          <div
            className="mx-1.5 font-mono text-sm leading-9
            text-zinc-200"
          >
            <>
              {isLoading ? (
                <div className="mx-3 text-zinc-500">loading...</div>
              ) : (
                <div className="flex-row flex">
                  <img
                    className="mx-2 mt-0.5 h-5 w-5 self-center rounded-full"
                    src={userData?.avatar_url}
                  ></img>
                  <div>{userData?.login}</div>
                  <div
                    className="mx-1 mt-1 flex h-7 w-7 opacity-20 hover:cursor-pointer hover:opacity-80"
                    onClick={() => {
                      localStorage.removeItem("accessToken");
                      navigate("/login", { replace: true });
                    }}
                  >
                    <IconContext.Provider
                      value={{ color: "white", className: "global-class-name" }}
                    >
                      <FiLogOut className="h-4 w-full self-center opacity-70" />
                    </IconContext.Provider>
                  </div>
                </div>
              )}
            </>
          </div>
        </div>
      ) : (
        <div className="flex-row mr-4 flex h-8 w-28 justify-center self-center rounded-full bg-zinc-200 p-3 hover:cursor-pointer hover:bg-zinc-100 active:bg-zinc-300">
          <IconContext.Provider
            value={{ color: "grey", className: "global-class-name" }}
          >
            <FiGithub className="ml-1 h-4 w-4 self-center opacity-70" />
          </IconContext.Provider>

          <div
            className="select-none self-center p-2 font-mono text-sm text-zinc-400"
            onClick={() => {
              loginWithGithub();
              setRerender(!rerender);
            }}
          >
            LOGIN
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
