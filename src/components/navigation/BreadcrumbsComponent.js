import React, { useRef } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export default function BreadcrumbsComponent() {
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const heading = useRef("");
  const crumbs = useRef([]);

  const queryClient = useQueryClient();

  switch (true) {
    case path === "/":
      heading.current = "Home";
      crumbs.current = [];
      break;

    case path === "/customers/create":
      heading.current = "Create new customer";
      crumbs.current = [
        {
          title: "Home",
          path: "/",
        },
        {
          title: "Customers",
          path: "/customers",
        },
        {
          title: "Create",
          path: path,
        },
      ];
      break;

    case path.startsWith("/customers/"):
      heading.current = "Customer Details";
      const customerId = path.split("/")[2]; // Extracting the ID from the path
      crumbs.current = [
        {
          title: "Home",
          path: "/",
        },
        {
          title: "Customers",
          path: "/customers",
        },
        {
          title: "Details",
          path: `/customers/${customerId}`,
        },
      ];
      break;

    default:
      heading.current = "";
      crumbs.current = [{ title: "Crumbs not setup for the current route" }];
      break;
  }

  function handleClick(event, path) {
    //Prevent link from redirecting
    event.preventDefault();

    //Redirect using router-dom
    navigate(path);
  }

  return (
    <Stack
      spacing={2}
      direction={"row"}
      sx={{
        alignItems: "center",
        my: 5,
        justifyContent: "space-between",
      }}
    >
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {crumbs.current.map((crumb, index) =>
          index === crumbs.current.length - 1 ? (
            <Typography key={index} color="text.primary">
              {crumb.title}
            </Typography>
          ) : (
            <Link
              underline={`${crumb.disabled ? "none" : "hover"}`}
              key={index}
              color="inherit"
              href={crumb.path}
              onClick={(event) => handleClick(event, crumb.path)}
            >
              {crumb.title}
            </Link>
          )
        )}
      </Breadcrumbs>

      <Typography variant="h6" component="div" sx={{}}>
        {heading.current}
      </Typography>
    </Stack>
  );
}
