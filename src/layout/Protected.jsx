import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

export default function Protected() {
  const { isLoading, user } = useContext(AuthContext);
  console.log(user, isLoading);

  return <>{user ? <Outlet /> : <Navigate to="/login" />}</>;
}
