import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLoggedInUser } from "../../services/server/auth/getLoggedInUser";
import FullscreenLoader from "../../components/FullscreenLoader";
import { checkUser } from "../../utils/middleware/checkUser";
import { useNavigate } from "react-router-dom";
import Customers from "../customer/List";
import { getCustomers } from "../../services/server/customers/getCustomers";
import { getCustomersViews } from "../../services/server/customers/getCustomersViews";
import { TextField } from "@mui/material";
import CustomerDetailsDialog from "../../components/utils/modal/customers/One";
import Map from "../../components/maps/MapBoxGl";

import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);

  const [customer, setCustomer] = useState(null);
  const [customerDialog, setCustomerDialog] = useState(false);

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: () => getLoggedInUser(),
    enabled: authChecked,
  });

  const customersQuery = useQuery({
    queryKey: ["customers"],
    queryFn: () => getCustomers(),
    enabled: userQuery.data ? true : false,
  });

  const customersViewsQuery = useQuery({
    queryKey: ["customersViews"],
    queryFn: () => getCustomersViews(),
    enabled: authChecked,
  });

  useEffect(() => {
    const onCheckUser = async () => {
      const isUser = await checkUser();

      if (!isUser) {
        setTimeout(() => {
          return navigate("/auth/login");
        }, 5000);
      }

      setAuthChecked(true);
    };

    onCheckUser();
  }, [navigate]);

  useEffect(() => {}, []);

  if (userQuery.isError) {
    return <div>Error fetching user data</div>;
  }

  if (customersViewsQuery.isSuccess) console.log(customersViewsQuery.data);

  const onCloseCustomerDialog = () => {
    setCustomerDialog(false);
    setCustomer(null);
  };

  return (
    <>
      {(customersQuery.isLoading || customersViewsQuery.isLoading) && (
        <FullscreenLoader />
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} md={12} sx={{}}>
          <TextField
            sx={{}}
            label="Search"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <Map
            customers={customersQuery.data ?? []}
            onMapLoaded={() => {
              //
            }}
            onSelectedCustomer={(customer) => {
              if (customer) {
                setCustomer(customer);
                setCustomerDialog(true);
              }
            }}
            onLocation={() => {
              //
            }}
          />
        </Grid>
      </Grid>

      <CustomerDetailsDialog
        open={customerDialog}
        customer={customer}
        onClose={onCloseCustomerDialog}
      />
    </>
  );
};

export default Home;
