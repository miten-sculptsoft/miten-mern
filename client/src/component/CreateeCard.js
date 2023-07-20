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

import React, { useEffect, useState } from "react";
import { NavLink, Navigate, useLocation, useNavigate } from "react-router-dom";
import "./CreateeCard.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import logo from "../assets/white.jpg";
import "./CreateeCard.css";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import banner from "../assets/Soluxy-banner.png";
import background from "../assets/background.png";

const CreateeCard = () => {
  const [color, setColor] = React.useState("");
  const navigate = useNavigate();
  const location = useLocation();

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
    newColor: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    seteCardData({ ...eCardData, [name]: value });
  };

  function handleNext() {
    navigate("/confirm-order", { state: eCardData });
    sessionStorage.setItem("allValue", JSON.stringify(eCardData));
  }

  useEffect(() => {
    const values = sessionStorage.getItem("allValue");
    if (values) {
      seteCardData(JSON.parse(values));
    }
  }, []);

  return (
    <div className="css-1ioylu4-abc">
      <div>
        <Typography variant="h6" sx={{ display: "flex", gap: "250px" }}>
          <div>
            <NavLink to="/add">Create eCard</NavLink>
            <p style={{ fontSize: "15px" }}>Fill in Your Details</p>
          </div>
          <div>
            <NavLink
              to="/confirm-order"
              // onClick={() =>
              //   sessionStorage.setItem("allValue", JSON.stringify(eCardData))
              // }
            >
              Review eCard
            </NavLink>
            <p style={{ fontSize: "15px" }}>View Order Details</p>
          </div>
          <div>
            <NavLink to="/billing">Billing</NavLink>
            <p style={{ fontSize: "15px" }}>Enter Billing Information</p>
          </div>
        </Typography>
      </div>
      <div
        id="new"
        style={{
          margin: "3%",
          display: "flex",
        }}
      >
        <br />
        <br />
        <div>
          <Typography variant="h5">Contact Information</Typography>
          <Box m={1}>
            <InputLabel>Theme</InputLabel>
            <TextField
              sx={{ width: "100px" }}
              value={eCardData.newColor}
              type={"color"}
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
            id="About"
            name="About"
            label="About Yourself...."
            value={eCardData.About}
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
              <MenuItem value={"Facebook"}>Facebook</MenuItem>
              <MenuItem value={"Instagram"}>Instagram</MenuItem>
              <MenuItem value={"Twitter"}>Twitter</MenuItem>
              <MenuItem value={"Youtube"}>Youtube</MenuItem>
              <MenuItem value={"Tiktok"}>Tiktok</MenuItem>
            </Select>
            <Button
              variant="contained"
              size="medium"
              sx={{ width: "20%", mt: 2 }}
              onClick={handleNext}
            >
              Next
            </Button>
          </FormControl>
        </div>
        <div style={{ marginLeft: "15%", width: "35%" }}>
          <Card sx={{ backgroundColor: eCardData.newColor }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                <img src={background} alt="no" width="280" />
              </Typography>
            </CardContent>
            <CardContent sx={{ margin: "auto", textAlign: "end" }}>
              <Typography variant="body2" color="text.secondary">
                Soluxy
              </Typography>
            </CardContent>
            <Typography variant="h5" sx={{ margin: "3%" }}>
              {eCardData.Full_name}
            </Typography>
            <Typography variant="h7" sx={{ padding: "3%", color: "#1815e7d9" }}>
              {eCardData.Job_title}
            </Typography>
            <br />
            <Typography variant="h6" sx={{ margin: "3%" }}>
              {eCardData.Company_name}
            </Typography>
            <br />
            <Typography variant="h7">{eCardData.Bio}</Typography>
            <br />
            <br />
            <LocalPhoneIcon
              sx={{ color: "#1815e7d9", margin: "-6px", ml: 2 }}
            />
            <Typography variant="h7" sx={{ mb: 2 }}>
              &nbsp;&nbsp;&nbsp;
              {eCardData.Phone_number}
            </Typography>
            <br />
            <br />
            <EmailIcon sx={{ color: "#1815e7d9", margin: "-6px", ml: 2 }} />
            <Typography variant="h7" sx={{ mb: 2 }}>
              &nbsp;&nbsp;&nbsp;
              {eCardData.Email}
            </Typography>
            <br />
            <br />
            <LanguageIcon sx={{ color: "#1815e7d9", margin: "-6px", ml: 2 }} />
            <Typography variant="h7" sx={{ mb: 2 }}>
              &nbsp;&nbsp;&nbsp;
              {eCardData.Website}
            </Typography>
            <br />
            <br />
            <LocationOnIcon
              sx={{ color: "#1815e7d9", margin: "-6px", ml: 2 }}
            />
            <Typography variant="h7" sx={{ mb: 2 }}>
              &nbsp;&nbsp;&nbsp;
              {eCardData.Address}
            </Typography>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                <img src={banner} alt="no" width="280" />
              </Typography>
            </CardContent>
            <Typography variant="h6" sx={{ margin: "5%" }}>
              About
            </Typography>
            <Typography variant="h7" sx={{ padding: "3%" }}>
              Soluxy is a digital name card service that can be used anywhere
              and anytime by anyone. This is the perfect service for businesses,
              freelancers, entrepreneurs, and professionals who needs to give
              out cards during a networking event or to friends, associates and
              customers. Your digital card design can be tailored to fit your
              needs and shared with the world in seconds. It’s time to take a
              fresh approach to digital business card design. Join the
              revolution today by using Soluxy and start working smarter!
            </Typography>
            <Typography variant="h5" sx={{ margin: "5%" }}>
              Let's Connect
            </Typography>
            <Typography variant="h7" sx={{ mb: 2 }}>
              &nbsp;&nbsp;&nbsp;
              {eCardData.Social_Media}
            </Typography>
            <Button variant="contained" sx={{ margin: "2%", width: "90%" }}>
              Share
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default CreateeCard;
