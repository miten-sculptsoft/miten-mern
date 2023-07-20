import { Typography } from "@mui/material";
import React from "react";
import { NavLink, json } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { useState } from "react";

function Billing() {
  return (
    <div style={{ padding: "40px", width: "100%" }}>
      <Typography variant="h6" sx={{ display: "flex", gap: "250px" }}>
        <div>
          <NavLink to="/add">Create eCard</NavLink>
          <p style={{ fontSize: "15px" }}>Fill in Your Details</p>
        </div>
        <div>
          <NavLink to="/confirm-order">Review eCard</NavLink>
          <p style={{ fontSize: "15px" }}>View Order Details</p>
        </div>
        <div>
          <NavLink to="/billing">Billing</NavLink>
          <p style={{ fontSize: "15px" }}>Enter Billing Information</p>
        </div>
      </Typography>
      <p>Billing</p>
    </div>
  );
}

export default Billing;
