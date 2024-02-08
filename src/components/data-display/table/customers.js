import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

export default function CustomersTableComponent({ customers }) {
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
      <div style={{ padding: 15 }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

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
