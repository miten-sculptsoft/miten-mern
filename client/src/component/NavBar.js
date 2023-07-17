import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <NavLink to="dashboard">eCard</NavLink>&nbsp;&nbsp;
      <NavLink to="analytics">Analytics</NavLink>
      <Outlet />
    </>
  );
};

export default NavBar;
