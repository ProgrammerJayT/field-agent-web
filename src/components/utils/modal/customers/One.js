import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Avatar, Divider, IconButton, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useNavigate } from "react-router-dom";

const CustomerModal = ({ customer, open, onClose }) => {
  const theme = useTheme();

  const navigate = useNavigate();

  useEffect(() => {
    //
  }, [open]);

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                {...stringAvatar(`${customer?.name} ${customer?.surname}`)}
                sx={{ height: 50, width: 50 }}
              />

              <Box sx={{ pl: 1 }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {customer?.name} {customer?.surname}
                </Typography>

                <Typography id="modal-modal-description" sx={{ fontSize: 13 }}>
                  {customer?.email}
                </Typography>
              </Box>
            </Box>

            <IconButton aria-label="delete" onClick={onClose} color="error">
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              id="modal-modal-description"
              sx={{ p: 1, fontSize: 13 }}
            >
              ({customer?.latitude} {customer?.longitude})
            </Typography>

            <IconButton
              color="primary"
              aria-label="View customer"
              onClick={() => {
                navigate(`/customers/${customer?.id}`);
              }}
            >
              <OpenInNewIcon />
            </IconButton>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  p: 1,
  bgcolor: "background.paper",
  boxShadow: 24,
};

export default CustomerModal;
