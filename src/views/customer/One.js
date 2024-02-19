import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Box, Button, IconButton, useTheme } from "@mui/material";
import FullscreenLoader from "../../components/FullscreenLoader";
import { stringAvatar } from "../../utils/ui/stringAvatar";
import Form from "../../components/forms/customers/CreateUpdateFormComponent";
import _ from "lodash";
import { Grid, Paper, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";
import Map from "../../components/maps/MapBoxGl";
import SnackbarComponent from "../../components/feedback/SnackbarComponent";
import { useQueryContext } from "../../utils/context/QueryContext";
import { failedRequest } from "../../utils/exception/handlers/failedRequest";

const One = () => {
  const { useCustomerQuery, customerViewMutation, updateCustomerMutation } =
    useQueryContext();

  useEffect(() => {
    customerViewMutation.mutate(id);
  }, []);

  const { id } = useParams();

  const customerQuery = useCustomerQuery(id);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "",
  });

  const [loading, setLoading] = useState({
    map: true,
    form: false,
  });

  const [isEditing, setIsEditing] = useState(false);

  const theme = useTheme();

  const onUpdateCustomer = async (customer) => {
    const newDetails = customer.new;
    const currentDetails = customer.current;

    const responseObject = {
      message: "",
      type: "",
    };

    if (_.isEqual(newDetails, currentDetails)) {
      responseObject.message =
        "No changes were made, therefore there's nothing to update";
      responseObject.type = "error";
    } else {
      setLoading({ ...loading, form: true });
      const response = await updateCustomerMutation.mutateAsync(newDetails);
      setLoading({ ...loading, form: false });

      if (response.customer) {
        responseObject.message = "Customer details successfully updated";
        responseObject.type = "success";
        setIsEditing(false);
      } else {
        //
        responseObject.message = failedRequest(response).message;
        responseObject.type = "error";
      }
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
    <>
      {useCustomerQuery(id).isLoading && loading.map && <FullscreenLoader />}

      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Paper
            elevation={10}
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: "white",
              width: "100%",
              display: "flex",
              justifyContent: { xs: "center", md: "space-between" },
              alignItems: "center",
              paddingX: 1,
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Avatar
                {...stringAvatar(
                  `${customerQuery.data?.name ?? "A"} ${
                    customerQuery.data?.surname ?? "A"
                  }`
                )}
                sx={{ height: 50, width: 50, marginY: 1 }}
              />

              <Box sx={{ p: 1 }}>
                <Typography variant="h6" component="div">
                  {customerQuery.data?.name ?? ""}{" "}
                  {customerQuery.data?.surname ?? ""}
                </Typography>

                <Typography id="modal-modal-description" sx={{ fontSize: 13 }}>
                  {customerQuery.data?.email}
                </Typography>
              </Box>
            </Box>

            <IconButton
              sx={{ color: "#fff" }}
              aria-label="View customer"
              onClick={() => {
                setIsEditing(!isEditing);
              }}
            >
              <Edit />
            </IconButton>
          </Paper>

          <Typography sx={{ textAlign: "center" }} variant="h6" component="div">
            Edit customer details
          </Typography>

          <Form
            onCleared={() => {
              //
            }}
            location={{
              longitude: customerQuery.data?.longitude ?? 0.0,
              latitude: customerQuery.data?.latitude ?? 0.0,
            }}
            intention={"edit"}
            loading={loading.form}
            customer={customerQuery.data}
            isEditing={isEditing}
            onSubmit={onUpdateCustomer}
          />
        </Grid>

        <Grid item xs={12} md={9}>
          <Map
            onMapLoaded={onMapLoaded}
            onLocation={() => {
              return;
            }}
            onSelectedCustomer={() => {
              return;
            }}
            intention={"view"}
            customers={[customerQuery.data] || []}
            loadingCustomers={customerQuery.isLoading}
          />
        </Grid>
      </Grid>

      <SnackbarComponent
        open={snackbar.open}
        type={snackbar.type}
        message={snackbar.message}
      />
    </>
  );
};

export default One;
