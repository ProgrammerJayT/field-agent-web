import React from "react";
import Snackbar from "@mui/material/Snackbar";

function FormSnackbar({ open, onClose, message }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      message={message}
    />
  );
}

export default FormSnackbar;
