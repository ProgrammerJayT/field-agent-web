/* eslint-disable no-restricted-globals */
import { Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const CustomerCreate = () => {
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    surname: "",
    email: "",
    address: "",
    latitude: "",
    longitude: "",
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Create new customer
        </Typography>
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          sx={{ marginRight: 1 }}
          label="Name"
          variant="outlined"
          size="small"
          fullWidth
          value={newCustomer.name}
          onChange={(e) =>
            setNewCustomer((prevCustomer) => ({
              ...prevCustomer,
              name: e.target.value,
            }))
          }
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          sx={{ marginRight: 1 }}
          label="Surname"
          variant="outlined"
          size="small"
          fullWidth
          value={newCustomer.name}
          onChange={(e) =>
            setNewCustomer((prevCustomer) => ({
              ...prevCustomer,
              surname: e.target.value,
            }))
          }
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          sx={{ marginRight: 1 }}
          label="Email address"
          variant="outlined"
          size="small"
          fullWidth
          value={newCustomer.name}
          onChange={(e) =>
            setNewCustomer((prevCustomer) => ({
              ...prevCustomer,
              email: e.target.value,
            }))
          }
        />
      </Grid>
    </Grid>
  );
};

export default CustomerCreate;
