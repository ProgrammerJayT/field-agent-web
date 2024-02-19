import React, { useState, useEffect } from "react";
import FullscreenLoader from "../../components/FullscreenLoader";
import { TextField } from "@mui/material";
import CustomerDetailsDialog from "../../components/utils/modal/customers/One";
import Map from "../../components/maps/MapBoxGl";

import { Grid } from "@mui/material";
import { useQueryContext } from "../../utils/context/QueryContext";

const Home = () => {
  const { customersQuery, customersViewsQuery } = useQueryContext();

  const [customer, setCustomer] = useState(null);
  const [customerDialog, setCustomerDialog] = useState(false);

  useEffect(() => {}, []);

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
