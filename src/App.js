import React from "react";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import RouteStack from "./router/RouteStack";
import AppBarComponent from "./components/layout/AppBarComponent";
import { BrowserRouter } from "react-router-dom";
import { QueryProvider } from "./utils/context/QueryContext";

const defaultTheme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <main>
        <CssBaseline />
        <AppBarComponent />

        <BrowserRouter>
          <QueryProvider>
            <RouteStack />
          </QueryProvider>
        </BrowserRouter>
      </main>
    </ThemeProvider>
  );
};

export default App;
