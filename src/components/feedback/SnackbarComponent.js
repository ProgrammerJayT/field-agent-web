import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const SnackbarComponent = ({ open, message, type }) => {
  return (
    <div>
      <Snackbar open={open}>
        <Alert severity={type} variant="filled" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnackbarComponent;
