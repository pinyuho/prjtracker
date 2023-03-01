import React from "react";

import Task from "./Task";
import { ITask } from "../../types";

interface TaskListProps {
  setIsLoading: (loading: boolean) => void;
  setShowEditModal: (showEditModal: boolean) => void;
  setEditTitle: (editTitle: string) => void;
  setEditBody: (editBody: string) => void;
  setEditIssueNumber: (editIssueNumber: number) => void;

  tasks: ITask[] | undefined;
}

const TaskList = ({
  setIsLoading,
  setShowEditModal,
  setEditTitle,
  setEditBody,
  setEditIssueNumber,
  tasks
}: TaskListProps) => {
  return (
    <div className="mx-8 my-4 grid w-11/12 grid-cols-1 gap-4 self-center sm:grid-cols-2 md:w-[1100px] md:grid-cols-3">
      {tasks?.map((task) => (
        <Task
          key={task.issueId}
          issueId={task.issueId}
          title={task.title}
          status={task.status}
          createdTime={task.createdTime}
          body={task.body}
          repo={task.repo}
          number={task.number}
          setIsLoading={setIsLoading}
          setShowEditModal={setShowEditModal}
          setEditTitle={setEditTitle}
          setEditBody={setEditBody}
          setEditIssueNumber={setEditIssueNumber}
        />
      ))}
    </div>
  );
};

export default TaskList;
