import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
    <TableContainer component={Paper}>
      <Box
        sx={{
          display: "flex",
          padding: 2,
          marginBottom: 5,
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
          variant="contained"
          onClick={() => {
            navigate("customers/create");
          }}
        >
          New Customer
        </Button>
      </Box>

      <Table sx={{ minWidth: 650 }} aria-label="simple table" elevation={0}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Surname</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>GPS coords</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredRows.map((row) => (
            <TableRow
              key={row.id} // Assuming each customer has an id
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.surname}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{`${row.address ?? "No address"}`}</TableCell>
              <TableCell>{`${row.latitude},${row.longitude}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
