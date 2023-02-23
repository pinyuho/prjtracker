import { useState, Dispatch, SetStateAction, useRef, RefObject } from "react";
import { useNavigate } from "react-router-dom";

import useGithubApi from "./useGithubApi";
import useClickOutside from "./useClickOutside";

function useModal<T extends HTMLDivElement = HTMLDivElement>(): [
  RefObject<T>,
  boolean,
  Dispatch<SetStateAction<boolean>>,
  (repoOwner: string, repoName: string, issueNumber: number) => void
] {
  const navigate = useNavigate();

  const ref = useRef(null);
  const [showModal, setShowModal] = useState(false);
  useClickOutside(ref, () => setShowModal(false));

  const { deleteIssue } = useGithubApi();

  // TODO: move to component
  const handleDeleteClickModal = async (
    repoOwner: string,
    repoName: string,
    issueNumber: number
  ) => {
    await deleteIssue(repoOwner, repoName, Number(issueNumber), "closed");
    setShowModal(false);
    navigate(`/${repoOwner}/${repoName}`);
  };

  return [ref, showModal, setShowModal, handleDeleteClickModal]; // to make this hook reusable
}

export default useModal;
