import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const EditeCard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [editCardData, setEditCardData] = useState({
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
    newColor: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEditCardData({ ...editCardData, [name]: value });
  };

  console.log(location.state);

  useEffect(() => {
    if (location.state) {
      setEditCardData(location.state);
    }
  }, []);

  async function handleUpdate() {
    try {
      const {
        Full_name,
        Job_title,
        Company_name,
        Bio,
        Phone_number,
        Email,
        Website,
        Address,
        About,
        Social_Media,
        newColor,
      } = editCardData;
      const res = await fetch(`/update-card/${editCardData._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Full_name,
          Job_title,
          Company_name,
          Bio,
          Email,
          Phone_number,
          Website,
          Address,
          About,
          Social_Media,
          newColor,
        }),
      });
      const data = await res.json();
      if (data) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1 style={{ color: "purple" }}>Edit Card</h1>
      <Box m={1}>
        <InputLabel>Theme</InputLabel>
        <TextField
          sx={{ width: "100px" }}
          value={editCardData.newColor}
          type={"color"}
          id="newColor"
          name="newColor"
          onChange={handleChange}
        />
      </Box>
      <br />
      <InputLabel shrink>
        <b>Full Name:</b>
      </InputLabel>
      <TextField
        type="text"
        id="Full_name"
        name="Full_name"
        label="Your Name"
        value={editCardData.Full_name}
        variant="outlined"
        onChange={handleChange}
        sx={{ width: 400 }}
        rows
      />
      <br />
      <br />
      <InputLabel shrink>
        <b>Job title:</b>
      </InputLabel>
      <TextField
        type="text"
        id="Job_title"
        name="Job_title"
        label="Job title"
        variant="outlined"
        value={editCardData.Job_title}
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
        value={editCardData.Company_name}
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
        value={editCardData.Bio}
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
        value={editCardData.Phone_number}
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
        value={editCardData.Email}
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
        value={editCardData.Website}
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
        value={editCardData.Address}
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
        id="About"
        name="About"
        label="About Yourself...."
        value={editCardData.About}
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
          value={editCardData.Social_Media}
          onChange={handleChange}
          label="Select Social Media"
          sx={{ width: { sm: 400 }, p: 1 }}
        >
          <MenuItem value={"Facebook"}>Facebook</MenuItem>
          <MenuItem value={"Instagram"}>Instagram</MenuItem>
          <MenuItem value={"Twitter"}>Twitter</MenuItem>
          <MenuItem value={"Youtube"}>Youtube</MenuItem>
          <MenuItem value={"Tiktok"}>Tiktok</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="success"
        sx={{ mt: 3, width: 100 }}
        onClick={handleUpdate}
      >
        Update
      </Button>
    </>
  );
};

export default EditeCard;
