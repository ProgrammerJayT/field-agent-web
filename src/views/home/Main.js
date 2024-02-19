import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLoggedInUser } from "../../services/server/auth/getLoggedInUser";
import FullscreenLoader from "../../components/FullscreenLoader";
import { checkUser } from "../../utils/middleware/checkUser";
import { useNavigate } from "react-router-dom";
import Customers from "../customer/List";
import { getCustomers } from "../../services/server/customers/getCustomers";
import { getCustomersViews } from "../../services/server/customers/getCustomersViews";
import { useTheme } from "@mui/material";

import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useQueryContext } from "../../utils/context/QueryContext";

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const {
    userQuery,
    customersQuery,
    customersViewsQuery,
    authChecked,
    setAuthChecked,
  } = useQueryContext();

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

  if (userQuery.isError) {
    return <div>Error fetching user data</div>;
  }

  if (customersViewsQuery.isSuccess) console.log(customersViewsQuery.data);

  return (
    <>
      {!userQuery.data || !customersQuery.data || !customersViewsQuery.data ? (
        <FullscreenLoader />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={3} sx={{}}>
            <Typography
              sx={{ textAlign: "center" }}
              variant="h6"
              component="div"
            >
              Recently viewed
            </Typography>

            <Paper
              elevation={10}
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: "white",
              }}
            >
              <List>
                {customersViewsQuery.data &&
                customersViewsQuery.data.length > 0 ? (
                  customersViewsQuery.data.map((view, index) => (
                    <ListItem key={view.customer.id}>
                      <ListItemText
                        primary={`${index + 1}. ${view.customer.name} ${
                          view.customer.surname
                        }`}
                      />
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText primary="No views yet" />
                  </ListItem>
                )}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={9}>
            <Customers />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Home;
