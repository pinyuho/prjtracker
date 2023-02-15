import React from "react";
import Task from "./Task";
import { ITask } from "../types";

interface TaskListProps {
  tasks: ITask[] | undefined;
}

const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <div className="z-10 mx-8 my-8 grid w-11/12 grid-cols-1 gap-4 self-center sm:grid-cols-2 md:w-[1100px] md:grid-cols-3">
      {tasks?.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          status={task.status}
          createdTime={task.createdTime}
          body={task.body}
        />
      ))}
    </div>
  );
};

export default TaskList;
