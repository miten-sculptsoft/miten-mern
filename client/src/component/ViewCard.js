import { Button, Card, CardContent, Typography } from "@mui/material";
import React, { useState } from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import banner from "../assets/Soluxy-banner.png";
import background from "../assets/background.png";
import { useLocation, useNavigate } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
  FacebookShareButton,
  InstapaperShareButton,
  TwitterShareButton,
} from "react-share";

const ViewCard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [viewCardData, setViewCardData] = useState(location.state);

  function handleShare() {
    navigate("/share");
  }

  return (
    <div style={{ width: 320 }}>
      <Card sx={{ backgroundColor: viewCardData.newColor }}>
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
          {viewCardData.Full_name}
        </Typography>
        <Typography variant="h7" sx={{ padding: "3%", color: "#1815e7d9" }}>
          {viewCardData.Job_title}
        </Typography>
        <br />
        <Typography variant="h6" sx={{ margin: "3%" }}>
          {viewCardData.Company_name}
        </Typography>
        <br />
        <Typography variant="h7">{viewCardData.Bio}</Typography>
        <br />
        <br />
        <LocalPhoneIcon sx={{ color: "#1815e7d9", margin: "-6px", ml: 2 }} />
        <Typography variant="h7" sx={{ mb: 2 }}>
          &nbsp;&nbsp;&nbsp;
          {viewCardData.Phone_number}
        </Typography>
        <br />
        <br />
        <EmailIcon sx={{ color: "#1815e7d9", margin: "-6px", ml: 2 }} />
        <Typography variant="h7" sx={{ mb: 2 }}>
          &nbsp;&nbsp;&nbsp;
          {viewCardData.Email}
        </Typography>
        <br />
        <br />
        <LanguageIcon sx={{ color: "#1815e7d9", margin: "-6px", ml: 2 }} />
        <Typography variant="h7" sx={{ mb: 2 }}>
          &nbsp;&nbsp;&nbsp;
          {viewCardData.Website}
        </Typography>
        <br />
        <br />
        <LocationOnIcon sx={{ color: "#1815e7d9", margin: "-6px", ml: 2 }} />
        <Typography variant="h7" sx={{ mb: 3 }}>
          &nbsp;&nbsp;&nbsp;
          {viewCardData.Address}
        </Typography>
        <Button variant="contained" sx={{ margin: "4%", width: "90%" }}>
          Save Contact
        </Button>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <img src={banner} alt="no" width="280" />
          </Typography>
        </CardContent>
        <Typography variant="h6" sx={{ margin: "5%" }}>
          About
        </Typography>
        <Typography variant="h7" sx={{ padding: "3%" }}>
          Soluxy is a digital name card service that can be used anywhere and
          anytime by anyone. This is the perfect service for businesses,
          freelancers, entrepreneurs, and professionals who needs to give out
          cards during a networking event or to friends, associates and
          customers. Your digital card design can be tailored to fit your needs
          and shared with the world in seconds. It’s time to take a fresh
          approach to digital business card design. Join the revolution today by
          using Soluxy and start working smarter!
        </Typography>
        <Typography variant="h5" sx={{ margin: "5%" }}>
          Let's Connect
        </Typography>
        <Typography variant="h7" sx={{ mb: 2, display: "flex", gap: "10px" }}>
          &nbsp;&nbsp;&nbsp;
          {viewCardData.Social_Media.map((val) => {
            return (
              <>
                <p>
                  {val === "Facebook" ? (
                    <FacebookShareButton url="https://www.facebook.com/VarunDhawan.co/">
                      <FacebookIcon />
                    </FacebookShareButton>
                  ) : null}
                </p>
                <p>
                  {val === "Instagram" ? (
                    <InstapaperShareButton url="https://www.instagram.com/varundvn/?hl=en">
                      <InstagramIcon />
                    </InstapaperShareButton>
                  ) : null}
                </p>
                <p>
                  {val === "Twitter" ? (
                    <TwitterShareButton url="https://twitter.com/i/flow/login?redirect_after_login=%2FVarunDhawan_FC">
                      <TwitterIcon />
                    </TwitterShareButton>
                  ) : null}
                </p>
                <p>
                  {val === "Youtube" ? (
                    <FacebookShareButton url="https://www.youtube.com/channel/UCeVMnSShP_Iviwkknt83cww">
                      <YouTubeIcon />
                    </FacebookShareButton>
                  ) : null}
                </p>
              </>
            );
          })}
        </Typography>
        <Button
          variant="contained"
          sx={{ margin: "2%", width: "90%" }}
          onClick={handleShare}
        >
          Share
        </Button>
      </Card>
    </div>
  );
};

export default ViewCard;
