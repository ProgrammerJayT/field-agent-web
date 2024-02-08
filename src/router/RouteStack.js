import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../views/auth/Login";
import Home from "../views/Home";
import { Container } from "@mui/material";
import CustomerCreate from "../views/customer/CustomerCreate";

const RouteStack = () => {
  return (
    <Container sx={{marginTop:4}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/customers/create" element={<CustomerCreate />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default RouteStack;
