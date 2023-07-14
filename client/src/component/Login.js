import { Typography } from "@mui/material";
import React, { useState } from "react";
import photo from "../assets/App-Login_photo.png";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, seterror] = useState({});

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [loginData, setLoginData] = useState({
    Email: "",
    Password: "",
  });

  const validateForm = () => {
    let err = {};

    if (loginData.Email === "") {
      err.Email = "Email Required";
    } else if (!loginData.Email.includes("@")) {
      err.Email = "Enter a valid Email";
    }
    if (loginData.Password === "") {
      err.Password = "Password Required";
    } else if (!loginData.Password.includes("@" || "$" || "#" || "&")) {
      err.Password = "Add special character in password";
    } else if (loginData.Password.length < 6) {
      err.Password = "Password must contain at least 6 characters";
    } else if (loginData.Password.length > 10) {
      err.Password = "Password not more than 10 characters";
    }

    seterror({ ...err });

    return Object.keys(err).length < 1;
  };

  async function handleSubmit() {
    const isValid = validateForm();
    if (isValid) {
      const { Email, Password } = loginData;
      const res = await fetch("/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email,
          Password,
        }),
      });
      const data = await res.json();
      if (res.status === 401) {
        toast.error("User not exists Plzz Signup", {
          position: "top-center",
          theme: "colored",
        });
      } else if (res.status === 402) {
        toast.error("Incorrect Password", {
          position: "top-center",
          theme: "colored",
        });
      } else {
        toast.success("Login Successfull", {
          position: "top-center",
          theme: "colored",
        });
        setLoginData({});
      }
    }
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginData({
      ...loginData,
      [name]: value,
    });
    seterror({ ...error, [name]: "" });
  };

  const forgotPassword = async () => {
    const { Email } = loginData;
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
      setLoginData({});
    }
  };

  return (
    <>
      <div
        id="new"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "5%",
        }}
      >
        <img src={photo} alt="Not found" height={500} />
        <Typography
          variant="h4"
          sx={{
            backgroundColor: "white",
            padding: "8%",
            overflowY: "auto",
            height: "280px",
            width: "300px",
          }}
        >
          Sign in to Soluxy
          <br />
          <br />
          <InputLabel shrink>
            <b>Email:</b>
          </InputLabel>
          <TextField
            id="email"
            name="Email"
            value={loginData.Email || ""}
            onChange={handleChange}
            label="Your Email"
            variant="outlined"
            sx={{ width: 280 }}
          />
          <div style={{ color: "red", fontSize: "15px" }}>{error.Email}</div>
          <br />
          <InputLabel shrink>
            <b>Password:</b>
          </InputLabel>
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              sx={{ width: 280 }}
              id="password"
              name="Password"
              value={loginData.Password || ""}
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <div style={{ color: "red", fontSize: "15px" }}>{error.Password}</div>
          <NavLink>
            <Typography sx={{ ml: 17, mt: 2 }} onClick={forgotPassword}>
              Forgot Password ?
            </Typography>
          </NavLink>
          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{ mt: 2, maxWidth: "100%" }}
            onClick={handleSubmit}
          >
            Login
          </Button>
          <div style={{ display: "flex" }}>
            <p style={{ fontSize: "15px", marginTop: "30px" }}>
              New to Soluxy?
            </p>
            &nbsp;
            <NavLink
              to="/registration"
              style={{ fontSize: "15px", marginTop: "30px" }}
            >
              Sign up Here
            </NavLink>
          </div>
        </Typography>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
