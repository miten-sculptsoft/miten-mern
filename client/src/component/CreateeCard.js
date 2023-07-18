import {
  Button,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import React from "react";
import { NavLink } from "react-router-dom";

const CreateeCard = () => {
  return (
    <div
      id="new"
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "5%",
      }}
    >
      <Typography variant="h4" sx={{}}>
        <Typography variant="h7">Signup to Soluxy</Typography>
        <br />
        <br />
        <InputLabel shrink>
          <b>Email:</b>
        </InputLabel>
        <TextField
          type="email"
          id="email"
          name="Email"
          label="Your Email"
          variant="outlined"
          sx={{ width: 280 }}
        />

        <br />
        <InputLabel shrink>
          <b>Name:</b>
        </InputLabel>
        <TextField
          type="text"
          id="name"
          name="Name"
          label="Your Name"
          variant="outlined"
          sx={{ width: 280 }}
        />

        <br />
        <InputLabel shrink>
          <b>Password:</b>
        </InputLabel>
        <TextField
          type="password"
          id="password"
          name="Password"
          label="Your Password"
          variant="outlined"
          sx={{ width: 280 }}
        />

        <br />
        <InputLabel shrink>
          <b>Birthday:</b>
        </InputLabel>

        <InputLabel shrink>
          <b>Phone Number:</b>
        </InputLabel>
        <TextField
          type="Number"
          id="number"
          name="Phone_Number"
          label="Your Number"
          variant="outlined"
          sx={{ width: 280 }}
        />

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

        <InputLabel shrink>
          <b>Address Line 1</b>
        </InputLabel>
        <TextField
          cols={35}
          rows={6}
          id="Address"
          name="Address_line_1"
          label="Address Line 1"
          sx={{ width: 280 }}
        />

        <br />
        <InputLabel shrink>
          <b>Address Line 2</b>
        </InputLabel>
        <TextField
          cols={35}
          rows={6}
          id="Address"
          name="Address_line_2"
          label="Address Line 2"
          sx={{ width: 280 }}
        />

        <br />
        <InputLabel shrink>
          <b>City</b>
        </InputLabel>
        <TextField
          cols={35}
          rows={6}
          id="Address"
          name="City"
          label="City"
          sx={{ width: 280 }}
        />

        <Button
          variant="contained"
          color="success"
          fullWidth
          sx={{ mt: 3, maxWidth: "100%" }}
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
    </div>
  );
};

export default CreateeCard;
