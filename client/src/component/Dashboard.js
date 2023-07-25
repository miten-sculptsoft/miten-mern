import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./CreateeCard.css";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import background from "../assets/background.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const [eCardOpen, seteCardOpen] = useState(false);
  const [backendCardData, setBackendCardData] = useState([]);

  const card = (
    <React.Fragment>
      <CardContent>
        <NavLink to="/add">
          <AddIcon
            onClick={() => seteCardOpen(true)}
            sx={{
              height: "150px",
              fontSize: "90px",
              marginLeft: "70px",
            }}
          />
        </NavLink>
        <Typography sx={{ textAlign: "center" }}>Add Card</Typography>
      </CardContent>
    </React.Fragment>
  );

  const auth = async () => {
    try {
      const res = await fetch("/user-eCard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setBackendCardData(data.data);
    } catch (error) {
      navigate("/login");
    }
  };

  function openeCard() {
    seteCardOpen(true);
  }

  async function handleEdit(id) {
    try {
      const res = await fetch(`/edit-card/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data.data);
      if (data) {
        navigate("/edit", { state: data.data });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    auth();
  }, []);

  return (
    <Box>
      <Stack spacing={2}>
        {eCardOpen ? (
          ""
        ) : backendCardData.length > 0 ? (
          <div style={{ display: "flex", gap: "50px" }}>
            {backendCardData.map((cards) => (
              <div>
                <Card
                  sx={{
                    backgroundColor: cards.newColor,
                    width: 300,
                  }}
                >
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      <img src={background} alt="no" width="260" />
                    </Typography>
                  </CardContent>
                  <CardContent sx={{ margin: "auto", textAlign: "end" }}>
                    <Typography variant="body2" color="text.secondary">
                      Soluxy
                    </Typography>
                  </CardContent>
                  <Typography variant="h5" sx={{ margin: "3%" }}>
                    {cards.Full_name}
                  </Typography>
                  <Typography
                    variant="h7"
                    sx={{ padding: "3%", color: "#1815e7d9" }}
                  >
                    {cards.Job_title}
                  </Typography>
                  <br />
                  <Typography variant="h6" sx={{ margin: "3%" }}>
                    {cards.Company_name}
                  </Typography>
                  <br />
                  <Typography variant="h7">{cards.Bio}</Typography>
                  <br />
                  <br />
                  <LocalPhoneIcon
                    sx={{ color: "#1815e7d9", margin: "-6px", ml: 2 }}
                  />
                  <Typography variant="h7" sx={{ mb: 2 }}>
                    &nbsp;&nbsp;&nbsp;
                    {cards.Phone_number}
                  </Typography>
                  <br />
                  <br />
                  <EmailIcon
                    sx={{ color: "#1815e7d9", margin: "-6px", ml: 2 }}
                  />
                  <Typography variant="h7" sx={{ mb: 2 }}>
                    &nbsp;&nbsp;&nbsp;
                    {cards.Email}
                  </Typography>
                  <br />
                  <br />
                  <LanguageIcon
                    sx={{ color: "#1815e7d9", margin: "-6px", ml: 2 }}
                  />
                  <Typography variant="h7" sx={{ mb: 2 }}>
                    &nbsp;&nbsp;&nbsp;
                    {cards.Website}
                  </Typography>
                  <br />
                  <br />
                  <LocationOnIcon
                    sx={{ color: "#1815e7d9", margin: "-6px", ml: 2 }}
                  />
                  <Typography variant="h7" sx={{ mb: 2 }}>
                    &nbsp;&nbsp;&nbsp;
                    {cards.Address}
                  </Typography>
                </Card>
                <Button
                  variant="outlined"
                  sx={{ mt: 3, width: 120 }}
                  onClick={() => handleEdit(cards._id)}
                >
                  Edit
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button variant="contained" sx={{ mt: 3, width: 120 }}>
                  Share
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <Box sx={{ minWidth: 275 }}>
            <Card
              variant="outlined"
              sx={{ borderRadius: "5% 5%", borderColor: "#2a24e3" }}
            >
              {card}
            </Card>
          </Box>
        )}
      </Stack>
      <Stack>
        <Button
          variant="contained"
          onClick={openeCard}
          color="success"
          sx={{
            backgroundColor: "red",
            position: "absolute",
            bottom: 20,
            right: 20,
          }}
        >
          <NavLink
            to="/add"
            style={{
              color: "white",
              textDecoration: "none",
            }}
          >
            Add Card
          </NavLink>
        </Button>
      </Stack>
    </Box>
  );
};

export default Dashboard;
