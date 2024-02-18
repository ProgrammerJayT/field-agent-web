import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../views/auth/Login";
import HomePage from "../views/home/Main";
import { Container } from "@mui/material";
import CustomerCreatePage from "../views/customer/Create";
import CustomersListPage from "../views/customer/Main";
import CustomerViewPage from "../views/customer/One";
import BreadcrumbsComponent from "../components/navigation/BreadcrumbsComponent";
import { useLocation } from "react-router-dom";

const RouteStack = () => {
  console.log("Use Location:", useLocation());

  return (
    <div style={{ paddingLeft: 30, paddingRight: 30 }}>
      <BreadcrumbsComponent />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/customers" element={<CustomersListPage />} />
        <Route path="/customers/create" element={<CustomerCreatePage />} />
        <Route path="/customers/:id" element={<CustomerViewPage />} />
      </Routes>
    </div>
  );
};

export default RouteStack;
