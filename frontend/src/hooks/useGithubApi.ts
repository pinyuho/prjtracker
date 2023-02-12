import { useState, useEffect, Dispatch, SetStateAction } from "react";

interface User {
  login: string; // username
  avatar_url: string;
}

const useGithubApi = (): [
  boolean,
  Dispatch<SetStateAction<boolean>>,
  boolean,
  Dispatch<SetStateAction<boolean>>,
  () => void,
  User | undefined,
  () => Promise<void>
] => {
  const [rerender, setRerender] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<User>();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    console.log(codeParam);

    async function getAccessToken() {
      await fetch(`http://localhost:4000/getAccessToken?code=${codeParam}`, {
        method: "GET"
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (data.access_token) {
            localStorage.setItem("accessToken", data.access_token);
            setRerender(!rerender);
          }
        });
    }

    // local storage
    if (codeParam && localStorage.getItem("accessToken") === null) {
      getAccessToken();
    }
  }, []);

  function loginWithGithub() {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}`
    );
  }

  async function getUserData() {
    await fetch("http://localhost:4000/getUserData", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}` // Bearer ACCESSTOKEN,
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setUserData(data);
        setIsLoading(false);
      });
  }

  return [
    rerender,
    setRerender,
    isLoading,
    setIsLoading,
    loginWithGithub,
    userData,
    getUserData
  ];
};

export default useGithubApi;
