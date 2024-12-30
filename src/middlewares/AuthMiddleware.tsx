import { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

const AuthMiddleware: FC<{ component: ReactNode }> = ({ component }) => {
  const isToken = !!localStorage.getItem("access_token") && !!localStorage.getItem("refresh_token");
  const location = useLocation();

  if (isToken && location.pathname === "/") {
    return <Navigate to="/account-details" replace />;
  }

  if (!isToken && location.pathname === "/account-details") {
    return <Navigate to="/" replace />;
  }

  return component;
};

export default AuthMiddleware;
