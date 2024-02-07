import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./views/auth/Login";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import RouteStack from "./router/RouteStack";
import AppBarComponent from "./components/layout/AppBarComponent";

const defaultTheme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <main
        style={{
          width: "100vw",
          height: "100vh",
          flexDirection: "column",
          display: "flex",
        }}
      >
        <AppBarComponent />
        <RouteStack />
      </main>
    </ThemeProvider>
  );
};

export default App;
