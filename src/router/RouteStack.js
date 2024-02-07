import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../views/auth/Login";
import Home from "../views/Home";
import { Container } from "@mui/material";

const RouteStack = () => {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default RouteStack;
