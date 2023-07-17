import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const auth = async () => {
    try {
      const res = await fetch("/user-dashboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      navigate("/login");
    }
  };

  useEffect(() => {
    auth();
  }, []);

  return (
    <>
      <p>eCard</p>
    </>
  );
};

export default Dashboard;
