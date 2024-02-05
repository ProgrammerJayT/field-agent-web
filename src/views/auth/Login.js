import React, { useState, useEffect, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LoadingButton from "@mui/lab/LoadingButton";
import CopyrightComponent from "../../components/CopyrightComponent";
import SnackbarComponent from "../../components/feedback/SnackbarComponent";
import validateEmail from "../../utils/exception/handlers/validateEmail";
import validatePassword from "../../utils/exception/handlers/validatePassword";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/server/auth/login";
import { failedRequest } from "../../utils/exception/handlers/failedRequest";

function SignIn() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    submitting: false,
    submitted: false,
    loading: false,
    valid: false,
    warning: "",
  });

  const components = useRef({
    snackbar: {
      open: false,
      message: "",
      type: "",
    },
  });

  const [email, setEmail] = useState({
    value: "",
    message: "",
    inValid: false,
  });

  const [password, setPassword] = useState({
    value: "",
    message: "",
    inValid: false,
  });

  useEffect(() => {
    const isEmailValid = validateEmail(email.value) === "";
    const isPasswordValid = validatePassword(password.value, "login") === "";

    setForm((prevForm) => ({
      ...prevForm,
      valid: isEmailValid && isPasswordValid,
    }));
  }, [email, password, form]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setForm((prevForm) => ({
      ...prevForm,
      warning: "",
    }));

    setEmail({
      ...email,
      message: validateEmail(email.value),
      inValid: validateEmail(email.value) ? true : false,
    });

    setPassword({
      ...password,
      message: validatePassword(password.value, "login"),
      inValid: validatePassword(password.value, "login") ? true : false,
    });

    if (!form.valid) {
      return;
    }

    setForm((prevForm) => ({
      ...prevForm,
      loading: true,
      submitting: true,
    }));

    const response = await login({
      email: email.value,
      password: password.value,
    });

    setForm((prevForm) => ({
      ...prevForm,
      loading: false,
      submitting: false,
      submitted: true,
    }));

    console.log("Login response", response);

    if (response.status !== 200) {
      resetComponents({
        open: true,
        name: "snackbar",
        type: "error",
        message: failedRequest(response).message,
      });

      if (failedRequest(response).code !== 422) {
        setTimeout(() => {
          resetComponents({ name: "snackbar" });
        }, 5000);
      } else {
        setForm((prevForm) => ({
          ...prevForm,
          warning: failedRequest(response).message,
        }));
      }
    }
  };

  const resetComponents = (settings) => {
    if (!components.current[settings.name]) {
      console.log("Component not found");
      return;
    }

    const component = components.current[settings.name];

    component.message = settings.message || "";
    component.open = settings.open || false;
    component.type = settings.type || "";
  };

  return (
    <Container component="main" maxWidth="auto" sx={{ alignItems: "center" }}>
      <CssBaseline />

      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: 1,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            error={email.inValid}
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            size="small"
            value={email.value}
            onChange={(e) => setEmail({ ...email, value: e.target.value })}
            helperText={email.message}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            size="small"
            value={password.value}
            onChange={(e) =>
              setPassword({ ...password, value: e.target.value })
            }
            helperText={password.message}
            error={password.inValid}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {form.warning.trim && (
              <Typography
                component="p"
                sx={{
                  color: "red",
                  fontWeight: "bold",
                  fontSize: 12,
                  textAlign: "center",
                }}
              >
                {form.warning}
              </Typography>
            )}

            <LoadingButton
              loading={form.loading}
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              size="small"
              disabled={!form.valid}
            >
              Submit
            </LoadingButton>
          </Box>
        </Box>
      </Box>

      <CopyrightComponent />

      <SnackbarComponent
        open={components.current.snackbar.open}
        message={components.current.snackbar.message}
        type={components.current.snackbar.type}
      />
    </Container>
  );
}

export default SignIn;
