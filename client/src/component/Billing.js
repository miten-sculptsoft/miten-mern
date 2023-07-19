import { Typography } from "@mui/material";
import React from "react";
import { NavLink, json } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { useState } from "react";

function Billing() {
  const [product, setProduct] = useState({
    name: "React from FB",
    price: 10,
    productBy: "Facebook",
  });

  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch("/payment", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("RESPONSE", response);
        const { status } = response;
        console.log("STATUS", status);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={{ padding: "40px", width: "100%" }}>
      <Typography variant="h6" sx={{ display: "flex", gap: "250px" }}>
        <div>
          <NavLink to="/add">Create eCard</NavLink>
          <p style={{ fontSize: "15px" }}>Fill in Your Details</p>
        </div>
        <div>
          <NavLink to="/billing">Billing</NavLink>
          <p style={{ fontSize: "15px" }}>Enter Billing Information</p>
        </div>
        <div>
          <NavLink to="/confirm-order">Confirm order</NavLink>
          <p style={{ fontSize: "15px" }}>View Order Details</p>
        </div>
      </Typography>
      <StripeCheckout
        stripeKey="pk_test_51NVZ0BSBIRkMM4U4CS5EpwNqvIEU2IjxfjmR97sm8bDYBJortqGsvOdH6M4ik6EtU5EL4v3xIUJL9VnjajDln9Wk00zYQ1aSjt"
        token={makePayment}
        name="Buy React"
        amount={product.price * 100}
      />
    </div>
  );
}

export default Billing;
