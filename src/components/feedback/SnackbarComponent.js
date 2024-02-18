import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function SnackbarComponent({ open, message, type }) {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    setSnackbar((prev) => ({
      ...prev,
      open: open,
    }));
  }, [open, message, type]);

  return (
    <div>
      <Snackbar open={snackbar.open}>
        <Alert severity={type} variant="filled" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
