import React, { useState, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";

import { IconCustom } from "../context/IconContext";

import useGithubApi from "../hooks/useGithubApi";
import useMobile from "../hooks/useMobile";

import ModalDelete from "./modals/ModalDelete";

interface TaskViewHeaderProps {
  title: string;
  inputTitle: string;
  setInputTitle: (inputTitle: string) => void;
  issueUrl: string;

  isLoading: boolean;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  handleDoneClick: () => void;
  handleInputTitle: (event: ChangeEvent<HTMLInputElement>) => void;
}
const TaskViewHeader = ({
  title,
  inputTitle,
  setInputTitle,
  issueUrl,

  isLoading,
  isEditing,
  setIsEditing,
  handleDoneClick,
  handleInputTitle
}: TaskViewHeaderProps) => {
  const navigate = useNavigate();
  const { repoOwner, repoName, issueNumber } = useParams();

  const [showModal, setShowModal] = useState(false);
  const { deleteIssue } = useGithubApi();
  const { isMobile } = useMobile();

  const handleDeleteClick = async () => {
    if (repoOwner && repoName && issueNumber) {
      await deleteIssue(repoOwner, repoName, Number(issueNumber), "closed");
    }
    setShowModal(false);
    navigate(`/${repoOwner}/${repoName}`);
  };

  return (
    <div className="flex h-9 flex-row justify-between">
      <div className="flex w-full flex-row ">
        {/* Routing Button */}
        <div
          className="mt-[1px] h-9 rounded bg-[#0000003c] px-6 leading-9
        opacity-70 shadow-inner shadow-black hover:cursor-pointer hover:opacity-90"
          onClick={() => navigate(`/${repoOwner}/${repoName}`)}
        >
          <div className="truncate font-mono text-sm leading-9 text-gray-300">
            /{repoName}
          </div>
        </div>

        {/* Task Title */}
        {!isMobile &&
          !isLoading &&
          (isEditing ? (
            <div className="mx-2 h-9 w-full truncate">
              <input
                className="h-full w-full rounded-md border-2 border-zinc-600 bg-[#2c2c2cc3] px-1.5 text-left text-lg font-semibold 
                leading-7 text-zinc-300 shadow-inner shadow-[#0c0c0c] outline-none placeholder-shown:border-red-500"
                type="text"
                onChange={handleInputTitle}
                // value={inputTitle}
                defaultValue={inputTitle}
                placeholder=" "
              />
            </div>
          ) : (
            <div className="mt-[0.5px] ml-4 h-9 w-full">
              <div className="h-full w-full overflow-hidden text-ellipsis text-left text-lg font-semibold leading-9 text-zinc-300 line-clamp-1">
                {title}
              </div>
            </div>
          ))}
      </div>

      {/* Edit Buttons */}
      {!isLoading &&
        (isEditing ? (
          <>
            <button
              className="mx-1 mt-[4px] flex h-[30px] flex-row rounded bg-[#4443433e] px-6 opacity-60 hover:opacity-90 active:opacity-60"
              onClick={() => setIsEditing(false)}
            >
              <div className="self-center text-sm font-bold uppercase leading-8 text-zinc-500">
                Cancel
              </div>
            </button>
            <button
              className="mx-1 mt-[5px] flex h-7 flex-row rounded bg-[#62a381] px-6 hover:bg-[#68af8c] active:bg-[#4c8064]"
              onClick={handleDoneClick}
            >
              <div className="text-sm font-bold uppercase leading-7 text-white">
                Done
              </div>
            </button>
          </>
        ) : (
          <>
            <button
              className="mx-1 mt-[5px] flex h-7 flex-row rounded bg-zinc-200 px-6 outline-none hover:bg-zinc-100 active:bg-[#c0bebe]"
              onClick={() => setIsEditing(true)}
            >
              <div className="text-sm font-bold uppercase leading-7 text-[#858585]">
                Edit
              </div>
            </button>

            {/* Delete */}
            <button
              className="mx-1 mt-[5px] flex h-7 flex-row rounded bg-red-500 px-2 shadow-inner shadow-red-700 hover:bg-[#fa6363] active:bg-red-500"
              onClick={() => setShowModal(true)}
            >
              <div className="self-center font-semibold leading-7 text-white">
                <IconCustom Icon={RiDeleteBin6Line} color={"white"} />
              </div>
            </button>

            {/* Modal Span */}
            {showModal && (
              <ModalDelete
                issueUrl={issueUrl}
                setShowModal={setShowModal}
                handleDeleteClick={() => {
                  if (repoOwner && repoName && issueNumber) handleDeleteClick();
                }}
              />
            )}
          </>
        ))}
    </div>
  );
};

export default TaskViewHeader;
