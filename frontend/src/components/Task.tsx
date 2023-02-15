import React from "react";
import { useNavigate } from "react-router-dom";

import { IconContext } from "react-icons";
import { AiOutlineDelete } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { FiEdit3 } from "react-icons/fi";

import useOnHover from "../hooks/useOnHover";

import TaskStatusLabel from "./TaskStatusLabel";

import { ITask as TaskProps } from "../types";

const Task = ({ id, title, status, createdTime, body }: TaskProps) => {
  const navigate = useNavigate();

  const [onHover, handleMouseOver, handleMouseOut] = useOnHover();

  return (
    <div
      className="h-max min-h-[188px] w-full rounded-md bg-zinc-800 p-4 drop-shadow-md 
    hover:cursor-pointer hover:bg-zinc-700 md:w-full"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={() => {
        navigate("/task", { replace: true });
      }}
    >
      {/* Task Header */}
      <div className="flex h-max justify-between">
        {/* Title */}
        <div className="mt-0.5 h-max w-11/12 text-left font-mono font-medium leading-6 text-white line-clamp-2">
          {title}
        </div>

        {/* Edit & Delete Icons. Only show when hovering on tasks. */}
        {onHover && (
          <div className="fixed right-3 w-16">
            <button className="h-6 rounded-l bg-zinc-800 px-1 align-middle hover:bg-zinc-300">
              <IconContext.Provider
                value={{ color: "grey", className: "global-class-name" }}
              >
                <FiEdit3 />
              </IconContext.Provider>
            </button>

            <button className="h-6 rounded-r bg-zinc-800 px-1 align-middle hover:bg-zinc-300">
              <IconContext.Provider
                value={{ color: "grey", className: "global-class-name" }}
              >
                <AiOutlineDelete />
              </IconContext.Provider>
            </button>
          </div>
        )}
      </div>

      {/* Task Created Time */}
      <div className="flex w-full justify-start ">
        <div className="my-1 mr-1 self-center opacity-60">
          <IconContext.Provider
            value={{ color: "grey", className: "global-class-name" }}
          >
            <BiTimeFive />
          </IconContext.Provider>
        </div>
        <div className="self-center text-sm text-zinc-500">
          <>{createdTime}</>
        </div>
      </div>

      {/* Task Label */}
      <div className="my-1 flex w-full justify-start">
        <TaskStatusLabel status="open" isButton={true} />
      </div>

      {/* Task Body */}
      <div className="mt-1 mr-3 text-left text-sm leading-6 text-zinc-300 line-clamp-2">
        {body}
      </div>
    </div>
  );
};

export default Task;
