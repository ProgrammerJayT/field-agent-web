import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Box, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export default function CustomersTableComponent({ customers }) {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Ensure customers is not null or undefined before filtering
  const filteredRows = customers
    ? customers.filter(
        (row) =>
          row.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.surname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.address?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <TableContainer component={Paper} sx={{ mb: 10 }}>
      <Box
        sx={{
          display: "flex",
          padding: 2,
          whiteSpace: "nowrap",
        }}
      >
        <TextField
          sx={{ marginRight: 1 }}
          label="Search"
          variant="outlined"
          size="small"
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <Button
          sx={{ marginLeft: 1, paddingX: 3 }}
          size="small"
          variant="outlined"
          onClick={() => {
            navigate("customers");
          }}
        >
          View All{" "}
        </Button>

        <Button
          sx={{ marginLeft: 1, paddingX: 3 }}
          size="small"
          variant="contained"
          onClick={() => {
            navigate("customers/create");
          }}
        >
          Create New
        </Button>
      </Box>

      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>GPS coords</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredRows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name} {row.surname}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{`${row.latitude},${row.longitude}`}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    aria-label="View customer"
                    onClick={() => {
                      navigate(`customers/${row.id}`);
                    }}
                  >
                    <OpenInNewIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </TableContainer>
  );
}
