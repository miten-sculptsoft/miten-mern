import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
import logo from "../assets/soluxy_logo.png";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Cookies from "js-cookie";

const drawerWidth = 240;

const NavBar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userData, setUserData] = useState();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const auth = async () => {
    try {
      const res = await fetch("/user-dashboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      let data = await res.json();
      setUserData(data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(userData);

  async function handleLogout() {
    try {
      const res = await fetch("/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      let data = await res.json();
      console.log(data);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    auth();
  }, []);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
          }}
        >
          <Toolbar sx={{ backgroundColor: "white" }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ color: "black" }}
            >
              eCards
            </Typography>
            <div style={{ marginLeft: "85%", marginTop: "20px" }}>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                {userData?.Name}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#0a0949fc",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <img
            src={logo}
            alt="No logo"
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "8%",
              width: "12%",
            }}
          />
          <Toolbar sx={{ mb: -4 }} />
          <List>
            <ListItem>
              <ListItemButton>
                <ListItemIcon style={{ color: "white" }}>
                  <CardMembershipIcon />
                  &nbsp;&nbsp;&nbsp;
                  <NavLink to="dashboard" style={{ color: "white" }}>
                    eCard
                  </NavLink>
                </ListItemIcon>
                <ListItemText />
              </ListItemButton>
            </ListItem>
          </List>
          <List>
            <ListItem>
              <ListItemButton>
                <ListItemIcon style={{ color: "white" }}>
                  <StackedBarChartIcon />
                  &nbsp;&nbsp;&nbsp;
                  <NavLink to="analytics" style={{ color: "white" }}>
                    Analytics
                  </NavLink>
                </ListItemIcon>
                <ListItemText />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Box sx={{ p: 4, mt: 5 }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default NavBar;
