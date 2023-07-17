import { Button, InputLabel, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [Email, setEmail] = useState("");
  const navigate = useNavigate();

  const forgotPassword = async () => {
    const res = await fetch("/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email,
      }),
    });
    const data = await res.json();
    if (res.status === 401) {
      toast.warn("Plzz Enter Your Mail", {
        position: "top-center",
        theme: "colored",
      });
    } else if (res.status === 402) {
      toast.error("This Email does not exists", {
        position: "top-center",
        theme: "colored",
      });
    } else {
      toast.success("Please Check Your inbox & Reset your Password", {
        position: "top-center",
        theme: "colored",
      });
      setEmail("");
      navigate("/login");
    }
  };

  return (
    <div
      style={{
        marginTop: "5%",
        marginLeft: "30%",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          backgroundColor: "white",
          padding: "10%",
          overflowY: "auto",
          height: "280px",
          width: "300px",
        }}
      >
        Forgot Password
        <br />
        <br />
        <InputLabel shrink>
          <b>Email:</b>
        </InputLabel>
        <TextField
          id="email"
          name="Email"
          label="Your Email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          sx={{ width: 280 }}
        />
        <Button
          variant="contained"
          color="success"
          fullWidth
          sx={{ mt: 2, maxWidth: "95%" }}
          onClick={forgotPassword}
        >
          Forgot Password
        </Button>
      </Typography>
    </div>
  );
};

export default ForgotPassword;
