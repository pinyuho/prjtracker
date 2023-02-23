import React from "react";

import Task from "./Task";
import { ITask } from "../types";

interface TaskListProps {
  setLoading: (loading: boolean) => void;
  setShowModal: (showModal: boolean) => void;
  setEditTitle: (editTitle: string) => void;
  setEditBody: (editBody: string) => void;
  setEditIssueNumber: (editIssueNumber: number) => void;

  tasks: ITask[] | undefined;
}

const TaskList = ({
  setLoading,
  setShowModal,
  setEditTitle,
  setEditBody,
  setEditIssueNumber,
  tasks
}: TaskListProps) => {
  return (
    <div className="mx-8 my-4 grid w-11/12 grid-cols-1 gap-4 self-center sm:grid-cols-2 md:w-[1100px] md:grid-cols-3">
      {/* <InfiniteScroll
        pageStart={0}
        loadMore={getIssues(repoSelected)}
        hasMore={true || false}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      > */}
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
          setLoading={setLoading}
          setShowModal={setShowModal}
          setEditTitle={setEditTitle}
          setEditBody={setEditBody}
          setEditIssueNumber={setEditIssueNumber}
        />
      ))}
      {/* </InfiniteScroll> */}
    </div>
  );
};

export default TaskList;
