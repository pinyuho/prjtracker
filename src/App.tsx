import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import TaskDetails from "./pages/TaskDetails";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task" element={<TaskDetails />} />
      </Routes>
    </div>
  );
}

export default App;
