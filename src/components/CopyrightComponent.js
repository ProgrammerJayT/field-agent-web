import { Typography, Link } from "@mui/material";

function CopyrightComponent(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.zusebmt.com/">
        Zuse Technologies (Pty) Ltd
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default CopyrightComponent;
