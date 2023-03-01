import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FiGithub, FiLogOut } from "react-icons/fi";
import { IconCustom } from "../context/IconContext";

import useGithubApi from "../hooks/useGithubApi";
import { useUserContext } from "../context/UserContext";

interface HeaderProps {
  isLoggedIn: boolean;
}

const Header = ({ isLoggedIn }: HeaderProps) => {
  const navigate = useNavigate();
  const {
    rerender,
    setRerender,
    isLoading,
    setIsLoading,
    loginWithGithub,
    getUserData
  } = useGithubApi();

  const { username, setUsername, avatarUrl, setAvatarUrl } = useUserContext();

  useEffect(() => {
    const fetchUser = async () => {
      const data: any = await getUserData();
      setUsername(data.login);
      setAvatarUrl(data.avatar_url);
    };
    if (
      localStorage.getItem("accessToken") !== null &&
      (username === "" || avatarUrl === "")
    ) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setIsLoading(true);
      fetchUser();
    }
  }, [localStorage.getItem("accessToken")]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUsername("");
    setAvatarUrl("");
    navigate("/login");
  };

  return (
    <div className="flex h-16 flex-row justify-between bg-zinc-800 drop-shadow-md">
      {/* Project Title */}
      <div
        className="h-16 p-3 pl-7 font-mono text-xl font-bold leading-10 text-white hover:cursor-pointer"
        onClick={() => navigate("/")}
      >
        prjtracker
      </div>

      {isLoggedIn ? (
        <div className="flex w-max flex-row justify-center self-center">
          <div
            className="mx-2 font-mono text-sm leading-9
            text-zinc-200"
          >
            <div className="flex flex-row">
              {/* User Information */}
              <img
                className="mx-[5px] mt-0.5 h-5 w-5 self-center rounded-full"
                src={avatarUrl}
              ></img>
              <div>{username}</div>

              {/* Logout Icon */}
              <div
                className="ml-2 mt-1 flex h-7 w-7 opacity-20 hover:cursor-pointer hover:opacity-80"
                onClick={logout}
              >
                <IconCustom
                  Icon={FiLogOut}
                  color={"white"}
                  className="mx-0.5 mt-1.5 h-4 w-full self-center opacity-70"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {username === "" && isLoading ? (
            <div className="mx-4 self-center font-mono text-sm text-zinc-400 duration-75">
              loading...
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
                onClick={() => {
                  // setIsLoading(true);
                  loginWithGithub();
                  setRerender(!rerender);
                }}
              >
                LOGIN
              </div>
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Header;
