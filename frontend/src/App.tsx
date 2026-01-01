import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";

import Login from "./pages/Login";
import RepoView from "./pages/RepoView";
import TaskView from "./pages/TaskView";

import { useUserContext } from "./context/UserContext";
import AuthLayout from "./routes/AuthLayout";

function App() {
  const { loggedIn, authLoading } = useUserContext();

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route
          path="/login"
          element={authLoading ? null : (!loggedIn ? <Login /> : <Navigate to="/" replace />)}
        />

        <Route element={<AuthLayout />}>
          <Route path="/" element={<RepoView />} />
          <Route path="/:repoOwner/:repoName" element={<RepoView />} />
          <Route path="/:repoOwner/:repoName/:issueNumber" element={<TaskView />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
