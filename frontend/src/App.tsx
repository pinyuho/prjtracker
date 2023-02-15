import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";

import Login from "./pages/Login";
import Home from "./pages/Home";
import TaskDetails from "./pages/TaskDetails";

import { UserContext } from "./context/UserContext";

function App() {
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  return (
    <div className="App">
      <UserContext.Provider
        value={{ username, setUsername, avatarUrl, setAvatarUrl }}
      >
        <Header
          isLoggedIn={localStorage.getItem("accessToken") ? true : false}
        />

        <Routes>
          <Route
            path="/"
            element={
              username && avatarUrl ? <Home /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/login"
            element={!(username || avatarUrl) ? <Login /> : <Navigate to="/" />}
          />
          <Route path="/task" element={<TaskDetails />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
