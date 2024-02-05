import React from "react";
import ReactLoading from "react-loading";
import { Typography } from "@mui/material";
import { blue, red } from "@mui/material/colors";

function FullscreenLoader({ message }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <ReactLoading
        type="spinningBubbles"
        color="primary"
        height={100}
        width={50}
      />

      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          color: blue,
        }}
      >
        {message || "Zuse Technologies"}
      </Typography>

      <Typography variant="p">Please wait...</Typography>
    </div>
  );
}

export default FullscreenLoader;
