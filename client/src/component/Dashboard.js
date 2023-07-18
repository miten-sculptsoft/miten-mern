import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateeCard from "./CreateeCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const [eCardOpen, seteCardOpen] = useState(false);

  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

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
      const res = await fetch("/user-dashboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
    } catch (error) {
      navigate("/login");
    }
  };

  function openeCard() {
    seteCardOpen(true);
  }

  useEffect(() => {
    auth();
  }, []);

  return (
    <>
      {eCardOpen && <CreateeCard />}
      {eCardOpen ? (
        ""
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
      {eCardOpen ? (
        ""
      ) : (
        <Button
          variant="contained"
          onClick={openeCard}
          color="success"
          sx={{
            marginTop: "100%",
            marginLeft: "340%",
            width: "40%",
            backgroundColor: "red",
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
      )}
    </>
  );
};

export default Dashboard;
