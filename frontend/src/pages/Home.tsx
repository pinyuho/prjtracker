import React, { useState, useEffect } from "react";

import { IRepo } from "../types";

import { useUserContext } from "../context/UserContext";
import useGithubApi from "../hooks/useGithubApi";

import HomeBar from "../components/HomeBar";

const Home = () => {
  const { username, setUsername, setAvatarUrl } = useUserContext();

  const [repos, setRepos] = useState<IRepo[]>();
  const { setLoading, getUserData, getRepos } = useGithubApi();

  useEffect(() => {
    const fetchUser = async () => {
      const data: any = await getUserData();
      setUsername(data.login);
      setAvatarUrl(data.avatar_url);
    };

    const fetchRepos = async () => {
      const data: any = await getRepos();
      setRepos(data);
    };

    setLoading(true);
    if (username === "") {
      fetchUser();
    }
    if (username) {
      fetchRepos();
    }
  }, []);

  return (
    <div className="flex flex-col">
      <HomeBar repos={repos} setLoading={setLoading} />
      <div className="mt-8 flex h-[450px] items-center justify-center">
        <div className="rounded-lg border-2 border-dashed border-zinc-800 py-1 px-4 text-zinc-500">
          Please choose a repository.
        </div>
      </div>
    </div>
  );
};

export default Home;
