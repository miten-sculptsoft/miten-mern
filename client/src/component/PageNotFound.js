import { Typography } from "@mui/material";
import React from "react";

function PageNotFound() {
  return (
    <div
      style={{
        marginTop: "5%",
        marginLeft: "25%",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          backgroundColor: "white",
          padding: "10%",

          width: "500px",
        }}
      >
        404 Page Not Found
      </Typography>
    </div>
  );
}

export default PageNotFound;
