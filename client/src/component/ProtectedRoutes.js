import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Login from "./Login";

const ProtectedRoutes = ({ Component }) => {
  const navigate = useNavigate();

  const isLogin = Cookies.get("jwtoken");

  useEffect(() => {
    if (!isLogin) {
      return navigate("/login");
    }
  });

  return (
    <>
      <Component />
    </>
  );
};

export default ProtectedRoutes;
