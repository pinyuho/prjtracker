import React from "react";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import TaskList from "../components/TaskList";

const Home = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <SearchBar />
      <TaskList />
    </div>
  );
};

export default Home;
