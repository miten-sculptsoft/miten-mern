import { Button, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

function Billing() {
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
            console.log(res.data.payment);
            window.location.href = res.data.url;
            sessionStorage.clear("allValue");
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
