import {Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Login from "../pages/Login";

export function PrivateRoute() {
  const { currentUser } = useAuth();
  
  return currentUser ? <Outlet /> : <Login/>;
}
