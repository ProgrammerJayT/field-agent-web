import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../views/auth/Login";
import HomePage from "../views/home/Main";
import { Container } from "@mui/material";
import CustomerCreatePage from "../views/customer/Create";
import CustomersListPage from "../views/customer/Main";
import CustomerViewPage from "../views/customer/One";
import BreadcrumbsComponent from "../components/navigation/BreadcrumbsComponent";
import { useLocation } from "react-router-dom";
import { useQueryContext } from "../utils/context/QueryContext";
import { checkUser } from "../utils/middleware/checkUser";
import { useNavigate } from "react-router-dom";
import FullscreenLoader from "../components/FullscreenLoader";

const RouteStack = () => {
  const { setAuthChecked, authChecked } = useQueryContext();
  const navigate = useNavigate();

  useEffect(() => {
    const onCheckUser = async () => {
      const isUser = await checkUser();

      if (!isUser) {
        console.log("Fale");

        return setTimeout(() => {
          navigate("/auth/login");
        }, 5000);
      }

      setAuthChecked(true);
    };

    onCheckUser();
  }, [navigate, setAuthChecked]);

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
