import React from "react";
import { useNavigate } from "react-router-dom";

import { IconContext } from "react-icons";
import { AiOutlineDelete } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { FiEdit3 } from "react-icons/fi";

import useOnHover from "../hooks/useOnHover";

import TaskStatusLabel from "./TaskStatusLabel";

const Task = () => {
  const navigate = useNavigate();

  const [onHover, handleMouseOver, handleMouseOut] = useOnHover();

  return (
    <div
      className="h-max w-full rounded-md bg-zinc-800 p-4 drop-shadow-md hover:cursor-pointer 
    hover:bg-zinc-700 md:w-72"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={() => {
        navigate("/task", { replace: true });
      }}
    >
      {/* Task Header */}
      <div className="flex h-6 justify-between">
        {/* Title */}
        <div className="pr-2 text-left align-bottom font-mono font-medium text-white">
          title
        </div>

        {/* Edit & Delete Icons. Only show when hovering on tasks. */}
        {onHover && (
          <div>
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

      {/* Task Label */}
      <div className="my-1 flex w-full justify-start">
        <TaskStatusLabel status="open" isButton={true} />
      </div>

      {/* Task Created Time */}
      <div className=" flex w-full justify-start ">
        <div className="mr-1 self-center opacity-60">
          <IconContext.Provider
            value={{ color: "grey", className: "global-class-name" }}
          >
            <BiTimeFive />
          </IconContext.Provider>
        </div>
        <div className="self-center text-sm text-zinc-500">
          January 18, 4:04 AM
        </div>
      </div>

      {/* Task Body */}
      <div className="mt-1 text-left text-sm leading-6 text-zinc-300 line-clamp-2">
        Recently, Google announced it wasew laying off approximately 6% of its
        workforce (or 12,000 people). This brings it in line with most of the
        rest of the tech industry. The reason given by a publicly contrite CEO
        was that they’d overhired in the boom following the COVID pandemic and
        that now they had to address it but they were oh-so-sorry and took full
        responsibility. Like many others my first reaction to this rationale was
        “bullshit”. I imagine the same is true for the people at Meta, Amazon,
        Microsoft et al going through this. I spent 10 years at Google so I have
        some views on how these things come about and they don’t reflect well on
        the people running the company.
      </div>
    </div>
  );
};

export default Task;
