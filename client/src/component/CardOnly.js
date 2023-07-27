import React, { useEffect, useState } from "react";
import ViewCard from "./ViewCard";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardContent, Typography } from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import banner from "../assets/Soluxy-banner.png";
import background from "../assets/background.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import QRCode from "qrcode";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const CardOnly = () => {
  const params = useParams();
  console.log(params.id);
  const navigate = useNavigate();
  const [cardviewData, setCardViewData] = useState("");

  const [url, seturl] = useState(
    `https://localhost:3000/card/${cardviewData.Full_name}/${cardviewData._id}`
  );

  function handleShare() {
    QRCode.toDataURL(url, (err, url) => {
      if (err) return console.error(err);

      console.log(url);
      navigate("/share", { state: [url, cardviewData] });
    });
  }

  const auth = async () => {
    try {
      const res = await fetch(`/user-eCard/${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setCardViewData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(cardviewData);

  function handleSave() {}

  useEffect(() => {
    auth();
  }, []);

  return (
    <div style={{ width: 320 }}>
      <Card sx={{ backgroundColor: cardviewData.newColor }}>
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
          {cardviewData.Full_name}
        </Typography>
        <Typography variant="h7" sx={{ padding: "3%", color: "#1815e7d9" }}>
          {cardviewData.Job_title}
        </Typography>
        <br />
        <Typography variant="h6" sx={{ margin: "3%" }}>
          {cardviewData.Company_name}
        </Typography>
        <br />
        <Typography variant="h7">{cardviewData.Bio}</Typography>
        <br />
        <br />
        <LocalPhoneIcon sx={{ color: "#1815e7d9", margin: "-6px", ml: 2 }} />
        <Typography variant="h7" sx={{ mb: 2 }}>
          &nbsp;&nbsp;&nbsp;
          {cardviewData.Phone_number}
        </Typography>
        <br />
        <br />
        <EmailIcon sx={{ color: "#1815e7d9", margin: "-6px", ml: 2 }} />
        <Typography variant="h7" sx={{ mb: 2 }}>
          &nbsp;&nbsp;&nbsp;
          {cardviewData.Email}
        </Typography>
        <br />
        <br />
        <LanguageIcon sx={{ color: "#1815e7d9", margin: "-6px", ml: 2 }} />
        <Typography variant="h7" sx={{ mb: 2 }}>
          &nbsp;&nbsp;&nbsp;
          {cardviewData.Website}
        </Typography>
        <br />
        <br />
        <LocationOnIcon sx={{ color: "#1815e7d9", margin: "-6px", ml: 2 }} />
        <Typography variant="h7" sx={{ mb: 3 }}>
          &nbsp;&nbsp;&nbsp;
          {cardviewData.Address}
        </Typography>
        <Button
          variant="contained"
          sx={{ margin: "4%", width: "90%" }}
          onClick={handleSave}
        >
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
          {cardviewData?.Social_Media?.map((val) => {
            return (
              <>
                <p>
                  {val === "Facebook" ? (
                    <a
                      href="https://www.facebook.com/VarunDhawan.co/"
                      target="_blank"
                      rel="noopener"
                    >
                      <FacebookIcon />
                    </a>
                  ) : null}
                </p>
                <p>
                  {val === "Instagram" ? (
                    <a
                      href="https://www.instagram.com/varundvn/?hl=en"
                      target="_blank"
                    >
                      <InstagramIcon />
                    </a>
                  ) : null}
                </p>
                <p>
                  {val === "Linkedin" ? (
                    <a
                      href="https://www.linkedin.com/checkpoint/challengesV2/AQEWa0auPffAkgAAAYmQwsBrQPW8hATfGf-cO75xCQaVaxwE88m_bm_vqXfqtBm3wwtcvjIeQsykLTk0dZaTSa4WOvyKrIv0Tw?original_referer=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fvivek-bibra-5023951"
                      target="_blank"
                    >
                      <LinkedInIcon />
                    </a>
                  ) : null}
                </p>
                <p>
                  {val === "Whatsapp" ? (
                    <a href="https://www.whatsapp.com" target="_blank">
                      <WhatsAppIcon />
                    </a>
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
          value={url}
        >
          Share
        </Button>
      </Card>
    </div>
  );
};

export default CardOnly;
