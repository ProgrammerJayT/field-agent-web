import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../views/auth/Login";
import Home from "../views/Home";

const RouteStack = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/auth/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RouteStack;
