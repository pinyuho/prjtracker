import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login";
import Home from "./pages/Home";
import TaskDetails from "./pages/TaskDetails";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/task" element={<TaskDetails />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
