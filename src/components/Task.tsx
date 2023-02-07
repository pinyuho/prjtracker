import React from "react";

const Task = () => {
  return (
    <div
      className="w-full md:w-72 h-32 p-2 bg-zinc-800 drop-shadow-md rounded-sm 
    hover:bg-zinc-700 active:bg-zinc-800 hover:cursor-pointer"
    >
      <div className="px-2 text-white text-left font-medium">title</div>
    </div>
  );
};

export default Task;
