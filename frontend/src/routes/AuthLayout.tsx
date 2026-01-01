import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

export default function AuthLayout() {
  const { loggedIn, authLoading } = useUserContext();

  if (authLoading) return null;
  if (!loggedIn) return <Navigate to="/login" replace />;

  return <Outlet />;
}
