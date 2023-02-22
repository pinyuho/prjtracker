import { useRef, useState, LegacyRef, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

import useGithubApi from "./useGithubApi";

function useModal(): [
  boolean,
  Dispatch<SetStateAction<boolean>>,
  (repoOwner: string, repoName: string, issueNumber: number) => void
] {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [
    rerender,
    setRerender,
    loading,
    setLoading,
    loginWithGithub,
    getUserData,
    getRepos,
    getIssues,
    getIssue,
    updateIssue,
    deleteIssue
  ] = useGithubApi();

  const handleDeleteClickModal = async (
    repoOwner: string,
    repoName: string,
    issueNumber: number
  ) => {
    await deleteIssue(repoOwner, repoName, Number(issueNumber), "closed");
    setShowModal(false);
    navigate(`/${repoOwner}/${repoName}`);
  };

  return [showModal, setShowModal, handleDeleteClickModal];
}

export default useModal;
