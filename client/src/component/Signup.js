import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import photo from "../assets/App-Login_photo.png";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import { NavLink, useNavigate } from "react-router-dom";
import "./Signup.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Cookies from "js-cookie";

const Signup = () => {
  const navigate = useNavigate();
  const [error, seterror] = useState({});
  const [formData, setFormData] = useState({
    Email: "",
    Name: "",
    Password: "",
    Phone_Number: "",
    Gender: "",
    Address_line_1: "",
    Address_line_2: "",
    City: "",
  });

  const [Birthday, setBirthday] = useState("");

  const validateForm = () => {
    let err = {};

    if (formData.Email === "") {
      err.Email = "Email Required";
    } else if (!formData.Email.includes("@")) {
      err.Email = "Enter a valid Email";
    }
    if (formData.Name === "") {
      err.Name = "Name Required";
    }
    if (formData.Password === "") {
      err.Password = "Password Required";
    } else if (!formData.Password.includes("@" || "$" || "#" || "&")) {
      err.Password = "Add special characters @,$,#,&";
    } else if (formData.Password.length < 6) {
      err.Password = "Password must contain at least 6 characters";
    } else if (formData.Password.length > 10) {
      err.Password = "Password not more than 10 characters";
    }
    if (Birthday === "") {
      err.Birthday = "Birthday Required";
    }
    if (formData.Phone_Number === "") {
      err.Phone_Number = "Phone_Number Required";
    } else if (formData.Phone_Number.length != 10) {
      err.Phone_Number = "Enter 10 digit Mobile Number";
    }
    if (formData.Gender === "") {
      err.Gender = "Gender Required";
    }
    if (formData.Address_line_1 === "") {
      err.Address_line_1 = "Address_line_1 Required";
    }
    if (formData.Address_line_2 === "") {
      err.Address_line_2 = "Address_line_2 Required";
    }
    if (formData.City === "") {
      err.City = "City Required";
    }

    seterror({ ...err });

    return Object.keys(err).length < 1;
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
    seterror({ ...error, [name]: "" });
  };

  async function handleClick() {
    let isValid = validateForm();
    console.log(isValid);
    if (isValid) {
      try {
        const {
          Email,
          Name,
          Password,
          Phone_Number,
          Gender,
          Address_line_1,
          Address_line_2,
          City,
        } = formData;
        const res = await fetch("/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Email,
            Name,
            Password,
            Birthday,
            Phone_Number,
            Gender,
            Address_line_1,
            Address_line_2,
            City,
          }),
        });
        const data = await res.json();
        console.log(data);
        if (res.status === 402) {
          toast.error("This email is already Register Enter another email", {
            position: "top-center",
            theme: "colored",
          });
        } else {
          toast.success("User Registration Successfully", {
            position: "top-center",
            theme: "colored",
          });
          navigate("/login");
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  useEffect(() => {
    const login = Cookies.get("jwtoken");
    if (login) {
      navigate("/dashboard");
    }
  }, []);

  return (
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
          overflowY: "scroll",
          height: "280px",
          width: "300px",
        }}
      >
        <Typography variant="h7">Signup to Soluxy</Typography>
        <br />
        <br />
        <InputLabel shrink>
          <b>Email:</b>
        </InputLabel>
        <TextField
          type="email"
          id="email"
          value={formData.Email || ""}
          onChange={handleChange}
          name="Email"
          label="Your Email"
          variant="outlined"
          sx={{ width: 280 }}
        />
        <div style={{ color: "red", fontSize: "15px" }}>{error.Email}</div>
        <br />
        <InputLabel shrink>
          <b>Name:</b>
        </InputLabel>
        <TextField
          type="text"
          id="name"
          name="Name"
          value={formData.Name || ""}
          onChange={handleChange}
          label="Your Name"
          variant="outlined"
          sx={{ width: 280 }}
        />
        <div style={{ color: "red", fontSize: "15px" }}>{error.Name}</div>
        <br />
        <InputLabel shrink>
          <b>Password:</b>
        </InputLabel>
        <TextField
          type="password"
          id="password"
          name="Password"
          value={formData.Password || ""}
          onChange={handleChange}
          label="Your Password"
          variant="outlined"
          sx={{ width: 280 }}
        />
        <div style={{ color: "red", fontSize: "15px" }}>{error.Password}</div>
        <br />
        <InputLabel shrink>
          <b>Birthday:</b>
        </InputLabel>
        {/* <input
          type="date"
          id="birthday"
          name="Birthday"
          value={formData.Birthday || ""}
          onChange={handleChange}
          style={{
            width: 280,
            height: 30,
            borderRadius: "8px 8px 8px 8px",
            fontFamily: "Poppins",
            borderWidth: "thin",
          }}
        /> */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            slotProps={{
              textField: {
                error: false,
              },
            }}
            sx={{ width: 280 }}
            id="birthday"
            value={Birthday}
            onChange={(newValue) => {
              setBirthday(newValue);
              seterror({ ...error, Birthday: "" });
            }}
          />
        </LocalizationProvider>
        <div style={{ color: "red", fontSize: "15px" }}>{error.Birthday}</div>
        <br />
        <InputLabel shrink>
          <b>Phone Number:</b>
        </InputLabel>
        <TextField
          type="Number"
          id="number"
          name="Phone_Number"
          value={formData.Phone_Number || ""}
          onChange={handleChange}
          label="Your Number"
          variant="outlined"
          sx={{ width: 280 }}
        />
        <div style={{ color: "red", fontSize: "15px" }}>
          {error.Phone_Number}
        </div>
        <br />
        <div style={{ display: "flex" }}>
          <FormLabel id="demo-radio-buttons-group-label" sx={{ mt: 1 }}>
            Gender&nbsp;&nbsp;
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            id="gender"
            name="Gender"
            value={formData.Gender || ""}
            onChange={handleChange}
          >
            <div style={{ display: "flex" }}>
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </div>
          </RadioGroup>
        </div>
        <div style={{ color: "red", fontSize: "15px" }}>{error.Gender}</div>
        <br />
        <InputLabel shrink>
          <b>Address Line 1</b>
        </InputLabel>
        <TextField
          cols={35}
          rows={6}
          id="Address"
          name="Address_line_1"
          value={formData.Address_line_1}
          onChange={handleChange}
          label="Address Line 1"
          sx={{ width: 280 }}
        />
        <div style={{ color: "red", fontSize: "15px" }}>
          {error.Address_line_1}
        </div>
        <br />
        <InputLabel shrink>
          <b>Address Line 2</b>
        </InputLabel>
        <TextField
          cols={35}
          rows={6}
          id="Address"
          name="Address_line_2"
          value={formData.Address_line_2}
          onChange={handleChange}
          label="Address Line 2"
          sx={{ width: 280 }}
        />
        <div style={{ color: "red", fontSize: "15px" }}>
          {error.Address_line_2}
        </div>
        <br />
        <InputLabel shrink>
          <b>City</b>
        </InputLabel>
        <TextField
          cols={35}
          rows={6}
          id="Address"
          name="City"
          value={formData.City}
          onChange={handleChange}
          label="City"
          sx={{ width: 280 }}
        />
        <div style={{ color: "red", fontSize: "15px" }}>{error.City}</div>
        <Button
          variant="contained"
          color="success"
          fullWidth
          sx={{ mt: 3, maxWidth: "100%" }}
          onClick={handleClick}
        >
          Sign Up
        </Button>
        <div style={{ display: "flex" }}>
          <p style={{ fontSize: "15px", marginTop: "30px" }}>
            Already Have an account ?
          </p>
          <NavLink to="/login" style={{ fontSize: "15px", marginTop: "30px" }}>
            Login Here
          </NavLink>
        </div>
      </Typography>
      <ToastContainer />
    </div>
  );
};

export default Signup;
