import { Button, Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/white.jpg";
import "./CreateeCard.css";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import banner from "../assets/Soluxy-banner.png";
import background from "../assets/background.png";

const ConfirmOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [reviewData, setReviewData] = useState(location.state);
  console.log(reviewData);

  function handleBack() {
    navigate("/add");
  }

  useEffect(() => {
    const values = sessionStorage.getItem("allValue");
    if (values) {
      setReviewData(JSON.parse(values));
    }
  }, []);

  return (
    <div style={{ padding: "40px", width: "100%" }}>
      <Typography variant="h6" sx={{ display: "flex", gap: "250px" }}>
        <div>
          <NavLink to="/add">Create eCard</NavLink>
          <p style={{ fontSize: "15px" }}>Fill in Your Details</p>
        </div>
        <div>
          <NavLink to="/confirm-order">Review eCard</NavLink>
          <p style={{ fontSize: "15px" }}>View Order Details</p>
        </div>
        <div>
          <NavLink to="/billing">Billing</NavLink>
          <p style={{ fontSize: "15px" }}>Enter Billing Information</p>
        </div>
      </Typography>
      <Typography variant="h4" sx={{ mt: 4 }}>
        Preview Your Card
      </Typography>
      <Typography variant="h6" sx={{ mt: 4 }}>
        Preview Your Information
      </Typography>
      <div style={{ marginTop: "10%" }}>
        <div style={{ display: "flex", gap: "10%" }}>
          <div>
            <div>
              <Typography variant="h7">
                Full Name - {reviewData?.Full_name}
              </Typography>
            </div>
            <div style={{ marginTop: "50%" }}>
              <Typography variant="h7">
                Job_title - {reviewData?.Job_title}
              </Typography>
            </div>
            <div style={{ marginTop: "50%" }}>
              <Typography variant="h7">
                Company_name - {reviewData?.Company_name}
              </Typography>
            </div>
            <div style={{ marginTop: "50%" }}>
              <Typography variant="h7">
                Phone_Number - {reviewData?.Phone_number}
              </Typography>
            </div>
            <div style={{ marginTop: "50%" }}>
              <Typography variant="h7">Email - {reviewData?.Email}</Typography>
            </div>
            <Button variant="contained" onClick={handleBack} sx={{ mt: 5 }}>
              Go Back
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button
              variant="contained"
              sx={{ mt: 5 }}
              onClick={() => navigate("/billing")}
            >
              Next
            </Button>
          </div>
          <div>
            <div>
              <Typography variant="h7">
                Website - {reviewData?.Website}
              </Typography>
            </div>
            <div style={{ marginTop: "40%" }}>
              <Typography variant="h7">
                Address - {reviewData?.Address}
              </Typography>
            </div>
            <div style={{ marginTop: "50%" }}>
              <Typography variant="h7">About - {reviewData?.About}</Typography>
            </div>
            <div style={{ marginTop: "40%" }}>
              <Typography variant="h7">Bio - {reviewData?.Bio}</Typography>
            </div>
            <div style={{ marginTop: "40%" }}>
              <Typography variant="h7">
                Social_Media - {reviewData?.Social_Media}
              </Typography>
            </div>
          </div>
          <div>
            <div style={{ width: "100%" }}>
              <Card
                sx={{
                  backgroundColor: reviewData?.newColor,
                  marginTop: "-60%",
                }}
              >
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    <img src={background} alt="no" width="300" />
                  </Typography>
                </CardContent>
                <CardContent sx={{ margin: "auto", textAlign: "end" }}>
                  <Typography variant="body2" color="text.secondary">
                    Soluxy
                  </Typography>
                </CardContent>
                <Typography variant="h5" sx={{ margin: "3%" }}>
                  {reviewData?.Full_name}
                </Typography>
                <Typography
                  variant="h7"
                  sx={{ padding: "3%", color: "#1815e7d9" }}
                >
                  {reviewData?.Job_title}
                </Typography>
                <br />
                <Typography variant="h6" sx={{ margin: "3%" }}>
                  {reviewData?.Company_name}
                </Typography>
                <br />
                <Typography variant="h7">{reviewData?.Bio}</Typography>
                <br />
                <br />
                <LocalPhoneIcon
                  sx={{ color: "#1815e7d9", margin: "-6px", ml: 2 }}
                />
                <Typography variant="h7" sx={{ mb: 2 }}>
                  &nbsp;&nbsp;&nbsp;
                  {reviewData?.Phone_number}
                </Typography>
                <br />
                <br />
                <EmailIcon sx={{ color: "#1815e7d9", margin: "-6px", ml: 2 }} />
                <Typography variant="h7" sx={{ mb: 2 }}>
                  &nbsp;&nbsp;&nbsp;
                  {reviewData?.Email}
                </Typography>
                <br />
                <br />
                <LanguageIcon
                  sx={{ color: "#1815e7d9", margin: "-6px", ml: 2 }}
                />
                <Typography variant="h7" sx={{ mb: 2 }}>
                  &nbsp;&nbsp;&nbsp;
                  {reviewData?.Website}
                </Typography>
                <br />
                <br />
                <LocationOnIcon
                  sx={{ color: "#1815e7d9", margin: "-6px", ml: 2 }}
                />
                <Typography variant="h7" sx={{ mb: 2 }}>
                  &nbsp;&nbsp;&nbsp;
                  {reviewData?.Address}
                </Typography>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    <img src={banner} alt="no" width="280" />
                  </Typography>
                </CardContent>
                <Typography variant="h5" sx={{ margin: "5%" }}>
                  Let's Connect
                </Typography>
                <Typography variant="h7" sx={{ mb: 2 }}>
                  &nbsp;&nbsp;&nbsp;
                  {reviewData?.Social_Media}
                </Typography>
                <Button variant="contained" sx={{ margin: "2%", width: "90%" }}>
                  Share
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default ConfirmOrder;
