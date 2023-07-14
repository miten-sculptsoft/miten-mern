import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const [Password, setPassword] = useState("");
  const token = useParams();
  console.log(token);

  const getResetPasswordPage = async () => {
    const res = await fetch(`/reset-password/${token.token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(res);
    if (res.status === 401) {
      navigate("*");
    } else if (res.status === 400) {
      navigate("*");
    } else {
      console.log("valid user");
    }
  };

  const postResetPassword = async () => {
    const res = await fetch(`/reset-password-post/${token.token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Password,
      }),
    });
    const data = await res.json();
    console.log(res);
    if (res.status === 400) {
      toast.error("This link has been expired", {
        position: "top-center",
        theme: "colored",
      });
      navigate("*");
    } else {
      toast.success("Password Reset Successfully", {
        position: "top-center",
        theme: "colored",
      });
      navigate("/login");
    }
  };

  useEffect(() => {
    getResetPasswordPage();
  }, []);

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
        Reset Password
        <br />
        <br />
        <InputLabel shrink>
          <b>Password:</b>
        </InputLabel>
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            New Password
          </InputLabel>
          <OutlinedInput
            sx={{ width: 280 }}
            id="password"
            name="resetPassword"
            value={Password || ""}
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
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
        <Button
          variant="contained"
          color="success"
          fullWidth
          sx={{ mt: 2, maxWidth: "95%" }}
          onClick={postResetPassword}
        >
          Reset Password
        </Button>
      </Typography>
    </div>
  );
};

export default ResetPassword;
