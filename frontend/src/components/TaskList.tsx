import React from "react";
import Task from "./Task";

const TaskList = () => {
  return (
    <div className="mx-8 my-8 grid w-11/12 grid-cols-1 gap-4 self-center sm:grid-cols-2 md:w-[910px] md:grid-cols-3">
      <Task />
      <Task />
      <Task />
      <Task />
      <Task />
      <Task />
      <Task />
      <Task />
      <Task />
      <Task />
    </div>
  );
};

export default TaskList;
