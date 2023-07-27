import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { saveAs } from "file-saver";

const ShareCard = () => {
  const location = useLocation();
  console.log(location.state);
  const [qrcode, setqrcode] = useState(location.state[0]);

  function handleCopy() {
    navigator.clipboard.writeText(
      `http://localhost:3000/card/${location.state[1].Full_name}/${location.state[1]._id}`
    );
    alert("Copied");
  }

  function handleSave() {
    saveAs(location.state[0], "Qrcode.png");
  }
  return (
    <div style={{ marginLeft: "400px" }}>
      <div>
        <h2 style={{ textAlign: "center", color: "purple" }}>Share eCard</h2>
        <img src={qrcode} alt="qrcode" width={250} />
        <h3 style={{ textAlign: "center" }}>{location.state[1].Full_name}</h3>
        <h3 style={{ textAlign: "center" }}>{location.state[1].Job_title}</h3>
      </div>
      <div style={{ display: "flex", gap: "80px", marginLeft: "40px" }}>
        <div>
          <ContentCopyIcon onClick={handleCopy} />
          <div>
            Copy <br />
            Url
          </div>
        </div>
        <div>
          <SaveAltIcon onClick={handleSave} />
          <div>Save File</div>
        </div>
      </div>
    </div>
  );
};

export default ShareCard;
