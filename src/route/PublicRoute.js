import {Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Home from "../pages/Home";

export function PublicRoute() {
  const { currentUser } = useAuth();
  

  return !currentUser ? <Outlet /> : <Home/>;
}
