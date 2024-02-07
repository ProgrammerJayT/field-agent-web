import React from "react";
import ReactLoading from "react-loading";
import { Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";

function FullscreenLoader({ message }) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
      // onClick={handleClose}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ReactLoading
          type="spinningBubbles"
          color="white"
          height={100}
          width={50}
        />

        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
          }}
        >
          {message || "Zuse Technologies"}
        </Typography>

        <Typography variant="p">Please wait...</Typography>
      </div>
    </Backdrop>
  );
}

export default FullscreenLoader;
