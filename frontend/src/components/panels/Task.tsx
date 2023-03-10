import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useUserContext } from "../../context/UserContext";
import { IconCustom } from "../../context/IconContext";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import moment from "moment";

import useHover from "../../hooks/useHover";
import useClickOutside from "../../hooks/useClickOutside";

import SwitchStatus from "../dropdowns/SwitchStatus";
import TaskDelete from "./TaskDelete";

import { TaskStatus } from "../../types";

export interface TaskProps {
  refScroll?: any;
  issueId: number;
  title: string;
  status: TaskStatus;
  createdTime: Date;
  body: string;
  repo: string;
  number: number;
  setIsLoading: (loading: boolean) => void;
  setShowEditModal: (showModal: boolean) => void;

  // Edit modal
  setEditTitle: (title: string) => void;
  setEditBody: (body: string) => void;
  setEditIssueNumber: (issueNumber: number) => void;

  // For RepoView page
  handleTaskStatusChange: (issueId: number, newStatus: TaskStatus) => void;
}

const Task = ({
  refScroll,
  issueId,
  title,
  status,
  createdTime,
  body,
  repo,
  number,
  setIsLoading,
  setShowEditModal,

  setEditTitle,
  setEditBody,
  setEditIssueNumber,
  handleTaskStatusChange
}: TaskProps) => {
  const navigate = useNavigate();

  const { username } = useUserContext();
  const [showTaskDelete, setShowTaskDelete] = useState(false);

  const [onHover, handleMouseOver, handleMouseOut] = useHover();

  const refClick = useRef(null);
  useClickOutside(refClick, () => setShowTaskDelete(false));

  return (
    <div ref={refScroll}>
      <div
        ref={refClick}
        className={`h-max min-h-[230px] w-full rounded-md bg-zinc-800 p-4 drop-shadow-md md:w-full ${
          !showTaskDelete
            ? `hover:cursor-pointer hover:bg-[#5b5e6767]` // regular mode
            : `` // delete mode
        } `}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={() => {
          navigate(`/${username}/${repo}/${number}`);
        }}
      >
        {/* Task Header */}
        <div className="flex h-max justify-between">
          {/* Title */}
          <div className="mt-0.5 mb-2 h-max w-11/12 text-left font-mono font-medium leading-6 text-white line-clamp-2">
            {title}
          </div>

          {/* Only show when hovering on tasks. */}
          {onHover && !showTaskDelete && (
            <div className="fixed right-4 w-16">
              {/* Edit Button */}
              <button
                className="h-7 rounded-l bg-zinc-800 px-2 align-middle hover:bg-zinc-300"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  setShowEditModal(true);
                  setEditTitle(title);
                  setEditBody(body);
                  setEditIssueNumber(number);
                  e.stopPropagation();
                }}
              >
                <IconCustom Icon={FiEdit3} color={"grey"} />
              </button>

              {/* Delete Button */}
              <button
                className="h-7 rounded-r bg-zinc-800 px-2 align-middle hover:bg-zinc-300"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  setShowTaskDelete(!showTaskDelete);
                  e.stopPropagation();
                }}
              >
                <IconCustom Icon={AiOutlineDelete} color={"grey"} />
              </button>
            </div>
          )}
          {showTaskDelete && (
            <TaskDelete
              issueNumber={number}
              setIsLoading={setIsLoading}
              setShowTaskDelete={setShowTaskDelete}
            />
          )}
        </div>
        {/* Issue Number & Created Time */}
        <div className="flex w-full justify-start ">
          <div className="mr-1 h-6 text-sm leading-6 text-zinc-600">
            #{number}
          </div>

          <div className="self-center text-sm text-zinc-600">
            <>Created at {moment(createdTime).format("MMM DD, YYYY")}</>
          </div>
        </div>
        {/* Task Label */}
        <div className="my-1 -ml-2 flex w-full justify-start">
          <SwitchStatus
            issueId={issueId}
            status={status}
            setIsLoading={setIsLoading}
            handleTaskStatusChange={handleTaskStatusChange}
          />
        </div>
        {/* Task Body */}
        <div className="mt-1 mr-3 text-left text-sm leading-6 text-zinc-300 line-clamp-2">
          {body}
        </div>
      </div>
    </div>
  );
};

export default Task;
