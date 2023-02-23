import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";

import { IconCustom } from "../../context/IconContext";

import useGithubApi from "../../hooks/useGithubApi";

interface TaskDeleteProps {
  issueNumber: number;
  setLoading: (loading: boolean) => void;
  setShowTaskDelete: (showTaskDelete: boolean) => void;
}

const TaskDelete = ({
  issueNumber,
  setLoading,
  setShowTaskDelete
}: TaskDeleteProps) => {
  const navigate = useNavigate();
  const { repoOwner, repoName } = useParams();
  const { deleteIssue } = useGithubApi();

  const exeDeleteIssue = async (
    repoOwner: string,
    repoName: string,
    issueNumber: number
  ) => {
    await deleteIssue(repoOwner, repoName, Number(issueNumber), "closed");
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    if (repoOwner && repoName) {
      exeDeleteIssue(repoOwner, repoName, issueNumber);
    }
    e.stopPropagation();
    navigate(0);
  };
  return (
    <>
      {/* Task Backgraound */}
      <div
        className="fixed top-0 left-0 z-50 flex h-full w-full justify-center rounded-md bg-red-600 opacity-30"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          console.log("clicked!!!!!!");
          setShowTaskDelete(false);
          e.stopPropagation();
        }}
      ></div>

      {/* Confirm Delete Button */}
      <button
        className="z-50 flex h-7 flex-row items-center rounded bg-red-500 px-1 hover:bg-[#fa6363] active:bg-red-500"
        onClick={handleDeleteClick}
      >
        <IconCustom
          Icon={RiDeleteBin6Line}
          color={"white"}
          className="mx-1 h-full self-center"
        />
      </button>
    </>
  );
};

export default TaskDelete;
