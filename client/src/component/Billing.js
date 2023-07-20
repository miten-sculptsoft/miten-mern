import { Button, Typography } from "@mui/material";
import React from "react";
import { NavLink, json } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { useState } from "react";
import axios from "axios";

function Billing({ data }) {
  async function handlePay() {
    try {
      const data = sessionStorage.getItem("allValue");
      const parsevalue = JSON.parse(data);
      console.log(parsevalue);
      axios
        .post(`/payment`, {
          parsevalue,
        })
        .then((res) => {
          if (res.data.url) {
            window.location.href = res.data.url;
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

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
      <Button
        variant="contained"
        color="success"
        fullWidth
        sx={{ mt: 2, maxWidth: "20%" }}
        onClick={handlePay}
      >
        Pay Here
      </Button>
    </div>
  );
}

export default Billing;
