import React from "react";

import Header from "../components/Header";
import TaskView from "../components/TaskView";

const TaskDetails = () => {
  return (
    <div className="flex flex-col">
      <Header isLoggedIn={true} />
      <TaskView />
    </div>
  );
};

export default TaskDetails;
