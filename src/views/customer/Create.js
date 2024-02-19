/* eslint-disable no-restricted-globals */
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import FullscreenLoader from "../../components/FullscreenLoader";
import { createCustomer } from "../../services/server/customers/createCustomer";
import { failedRequest } from "../../utils/exception/handlers/failedRequest";
import SnackbarComponent from "../../components/feedback/SnackbarComponent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Form from "../../components/forms/customers/CreateUpdateFormComponent";
import { stringAvatar } from "../../utils/ui/stringAvatar";
import { Person } from "@mui/icons-material";
import Map from "../../components/maps/MapBoxGl";
import { useQueryContext } from "../../utils/context/QueryContext";

export default function CustomerCreate() {
  const { newCustomerMutation } = useQueryContext();

  const theme = useTheme();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "",
  });

  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
  });

  const [loading, setLoading] = useState({
    map: true,
    form: false,
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const onLocation = (location) => {
    if (location) {
      setLocation({
        latitude: location.lat,
        longitude: location.lng,
      });
    }
  };

  const onCreateCustomer = async (data) => {
    setLoading({ ...loading, form: true });

    const response = await newCustomerMutation.mutateAsync({
      name: data.name,
      surname: data.surname,
      email: data.email,
      latitude: location.latitude,
      longitude: location.longitude,
      role: "customer",
    });

    setLoading({ ...loading, form: false });

    const responseObject = {
      message: "",
      type: "",
    };

    if (response.token) {
      responseObject.message = "Customer created successfully";
      responseObject.type = "success";
      setIsSuccess(true);
    } else {
      //
      responseObject.message = failedRequest(response).message;
      responseObject.type = "error";
    }

    setSnackbar((prev) => ({
      ...prev,
      open: true,
      message: responseObject.message,
      type: responseObject.type,
    }));

    setTimeout(() => {
      setSnackbar((prev) => ({
        ...prev,
        open: false,
        message: "",
        type: "",
      }));
    }, 3000);
  };

  const onMapLoaded = () => {
    setLoading({ ...loading, map: false });
  };

  return (
    <Grid container spacing={2}>
      {loading.map && <FullscreenLoader />}

      <Grid item xs={12} md={3}>
        <Paper
          elevation={10}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "white",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingX: 1,
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Avatar
              {...stringAvatar("Name Surname")}
              sx={{ height: 50, width: 50, marginY: 1 }}
            />

            <Box sx={{ p: 1 }}>
              <Typography
                sx={{ textAlign: "center" }}
                variant="h6"
                component="div"
              >
                Name & Surname
              </Typography>

              <Typography id="modal-modal-description" sx={{ fontSize: 13 }}>
                Email address
              </Typography>
            </Box>
          </Box>

          <Person />
        </Paper>

        <Typography sx={{ textAlign: "center" }} variant="h6" component="div">
          New Customer
        </Typography>

        <Form
          onSubmit={onCreateCustomer}
          location={location}
          loading={loading.form}
          isSuccess={isSuccess}
          onCleared={() => {
            setIsSuccess(false);
          }}
        />
      </Grid>

      <Grid item xs={12} md={9}>
        <Map
          onLocation={onLocation}
          onMapLoaded={onMapLoaded}
          intention={"pick"}
        />
      </Grid>

      <SnackbarComponent
        open={snackbar.open}
        type={snackbar.type}
        message={snackbar.message}
      />
    </Grid>
  );
}
