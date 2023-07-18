import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const CreateeCard = () => {
  const [color, setColor] = React.useState("");

  const [eCardData, seteCardData] = useState({
    Full_name: "",
    Job_title: "",
    Company_name: "",
    Bio: "",
    Phone_number: "",
    Email: "",
    Website: "",
    Address: "",
    About: "",
    Social_Media: [],
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    seteCardData({ ...eCardData, [name]: value });
  };

  return (
    <div
      id="new"
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "5%",
      }}
    >
      <Typography variant="h6">
        <NavLink to="/add">Create eCard</NavLink>
        <br />
        <br />
        <Typography variant="h5">Contact Information</Typography>
        {/* <Box m={1}>
          <InputLabel>Theme</InputLabel>
          <TextField
            sx={{ width: "100px" }}
            value={color}
            type={"color"}
            onChange={(e) => setColor(e.target.value)}
          />
        </Box> */}
        <br />
        <InputLabel shrink>
          <b>Full Name:</b>
        </InputLabel>
        <TextField
          type="text"
          id="Full_name"
          name="Full_name"
          label="Your Name"
          value={eCardData.Full_name}
          variant="outlined"
          onChange={handleChange}
          sx={{ width: 400 }}
          rows
        />
        <br />
        <br />
        <InputLabel shrink>
          <b>Jon title:</b>
        </InputLabel>
        <TextField
          type="text"
          id="Job_title"
          name="Job_title"
          label="Job title"
          variant="outlined"
          value={eCardData.Job_title}
          onChange={handleChange}
          sx={{ width: 400 }}
          rows
        />
        <br />
        <br />
        <InputLabel shrink>
          <b>Company Name:</b>
        </InputLabel>
        <TextField
          type="text"
          id="Company_name"
          name="Company_name"
          label="Your Company Name"
          value={eCardData.Company_name}
          variant="outlined"
          onChange={handleChange}
          sx={{ width: 400 }}
          rows
        />
        <br />
        <br />
        <InputLabel shrink>
          <b>Bio:</b>
        </InputLabel>
        <TextField
          cols={35}
          rows={8}
          id="Bio"
          name="Bio"
          label="Your Short Bio"
          value={eCardData.Bio}
          onChange={handleChange}
          sx={{ width: 400 }}
        />
        <br />
        <br />
        <InputLabel shrink>
          <b>Contact Number:</b>
        </InputLabel>
        <TextField
          cols={35}
          rows={8}
          type="Number"
          id="Phone_number"
          name="Phone_number"
          label="Mobile Number"
          value={eCardData.Phone_number}
          onChange={handleChange}
          sx={{ width: 400 }}
        />
        <br />
        <br />
        <InputLabel shrink>
          <b>Email:</b>
        </InputLabel>
        <TextField
          cols={35}
          rows={8}
          id="Email"
          name="Email"
          label="Your Email"
          value={eCardData.Email}
          onChange={handleChange}
          sx={{ width: 400 }}
        />
        <br />
        <br />
        <InputLabel shrink>
          <b>Website:</b>
        </InputLabel>
        <TextField
          cols={35}
          rows={8}
          id="Website"
          name="Website"
          label="URL"
          value={eCardData.Website}
          onChange={handleChange}
          sx={{ width: 400 }}
        />
        <br />
        <br />
        <InputLabel shrink>
          <b>Address:</b>
        </InputLabel>
        <TextField
          cols={35}
          rows={8}
          id="Address"
          name="Address"
          label="Your Address"
          value={eCardData.Address}
          onChange={handleChange}
          sx={{ width: 400 }}
        />
        <br />
        <br />
        <InputLabel shrink>
          <b>About:</b>
        </InputLabel>
        <TextField
          cols={35}
          rows={8}
          id="Bio"
          name="Bio"
          label="About Yourself...."
          value={eCardData.Bio}
          onChange={handleChange}
          sx={{ width: 400 }}
        />
        <br />
        <br />
        <Typography variant="h5">Social Media</Typography>
        <br />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Select Social Media
          </InputLabel>

          <Select
            multiple
            id="Social_Media"
            name="Social_Media"
            value={eCardData.Social_Media}
            onChange={handleChange}
            label="Select Social Media"
            sx={{ width: { sm: 400 }, p: 1 }}
          >
            <MenuItem value={"Admin"}>Facebook</MenuItem>
            <MenuItem value={"Marketing"}>Instagram</MenuItem>
            <MenuItem value={"User"}>Twitter</MenuItem>
            <MenuItem value={"Marketing"}>Youtube</MenuItem>
            <MenuItem value={"User"}>Tiktok</MenuItem>
          </Select>
        </FormControl>
      </Typography>
    </div>
  );
};

export default CreateeCard;
