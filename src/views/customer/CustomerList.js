import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import CustomersTableComponent from "../../components/data-display/table/customers";
import { useQueryClient } from "@tanstack/react-query";

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

export default function CustomerList() {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const customers = queryClient.getQueryData(["customers"]);

  return (
    <Grid container spacing={2} sx={{}}>
      <Grid item xs={12} md={8}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Customers
        </Typography>

        <CustomersTableComponent customers={customers} />
      </Grid>

      <Grid item xs={12} md={4} sx={{}}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Recently viewed
        </Typography>

        <Paper
          elevation={10}
          sx={{ backgroundColor: theme.palette.primary.main, color: "white" }}
        >
          <List>
            {generate(
              <ListItem>
                <ListItemText primary="Single-line item" />
              </ListItem>
            )}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
}
