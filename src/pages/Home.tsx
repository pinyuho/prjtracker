import React from "react";

import Header from "../components/Header";
import ActionBar from "../components/ActionBar";
import TaskList from "../components/TaskList";

const Home = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <ActionBar />
      <TaskList />
    </div>
  );
};

export default Home;
