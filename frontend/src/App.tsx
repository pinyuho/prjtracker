import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";

import Login from "./pages/Login";
import Home from "./pages/Home";
import RepoView from "./pages/RepoView";
import TaskView from "./pages/TaskView";

import { useUserContext } from "./context/UserContext";

function App() {
  const { username, avatarUrl } = useUserContext();

  return (
    <div className="App">
      <Header isLoggedIn={localStorage.getItem("accessToken") ? true : false} />

      <Routes>
        <Route
          path="/login"
          element={!(username || avatarUrl) ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={username && avatarUrl ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/:repoOwner/:repoName" element={<RepoView />} />
        <Route
          path="/:repoOwner/:repoName/:issueNumber"
          element={<TaskView />}
        />
      </Routes>
    </div>
  );
}

export default App;
