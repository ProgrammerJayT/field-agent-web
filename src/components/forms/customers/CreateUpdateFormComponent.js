import { Box, Grid, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import validateEmail from "../../../utils/exception/handlers/validateEmail";
import validateUserName from "../../../utils/exception/handlers/validateUserName";
import { LoadingButton } from "@mui/lab";

const CreateUpdateFormComponent = ({
  location,
  loading,
  onSubmit,
  isSuccess,
  onCleared,
  intention,
  customer,
  isEditing,
}) => {
  const [name, setName] = useState({
    value: "",
    message: "",
    inValid: false,
  });

  const [surname, setSurname] = useState({
    value: "",
    message: "",
    inValid: false,
  });
  const [email, setEmail] = useState({
    value: "",
    message: "",
    inValid: false,
  });

  const [form, setForm] = useState({
    valid: false,
  });

  useEffect(() => {
    const isNameValid = validateUserName(name.value, "name") === "";
    const isSurnameValid = validateUserName(surname.value, "surname") === "";
    const isEmailValid = validateEmail(email.value) === "";

    setForm((prevForm) => ({
      ...prevForm,
      valid: isEmailValid && isNameValid && isSurnameValid,
    }));
  }, [name.value, surname, email, form.valid]);

  useEffect(() => {
    if (isSuccess) {
      setName({ ...name, value: "" });
      setSurname({ ...surname, value: "" });
      setEmail({ ...email, value: "" });

      onCleared();
    }
  }, [isSuccess, name, surname, email, onCleared]);

  const handleSubmit = () => {
    let data = null;

    if (intention === "edit") {
      data = {
        current: customer,
        new: {
          id: customer.id,
          role: customer.role,
          name: name.value,
          surname: surname.value,
          email: email.value,
          latitude: location.latitude,
          longitude: location.longitude,
        },
      };
    } else {
      data = {
        name: name.value,
        surname: surname.value,
        email: email.value,
        latitude: location.latitude,
        longitude: location.longitude,
      };
    }

    onSubmit(data);
  };

  useEffect(() => {
    if (customer) {
      setName((prevName) => ({
        ...prevName,
        value: customer.name,
      }));

      setSurname((prevSurname) => ({
        ...prevSurname,
        value: customer.surname,
      }));

      setEmail((prevEmail) => ({
        ...prevEmail,
        value: customer.email,
      }));
    }
  }, [customer]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <TextField
          sx={{ marginRight: 1 }}
          label="Name"
          variant="outlined"
          size="small"
          fullWidth
          disabled={loading || (intention === "edit" ? !isEditing : false)}
          value={name.value}
          onChange={(e) => setName({ ...name, value: e.target.value })}
        />
      </Grid>

      <Grid item xs={12} md={12}>
        <TextField
          sx={{ marginRight: 1 }}
          label="Surname"
          variant="outlined"
          size="small"
          fullWidth
          disabled={loading || (intention === "edit" ? !isEditing : false)}
          value={surname.value}
          onChange={(e) => setSurname({ ...name, value: e.target.value })}
        />
      </Grid>

      <Grid item xs={12} md={12}>
        <TextField
          sx={{ marginRight: 1 }}
          label="Email address"
          variant="outlined"
          size="small"
          fullWidth
          disabled={loading || (intention === "edit" ? !isEditing : false)}
          value={email.value}
          onChange={(e) => setEmail({ ...email, value: e.target.value })}
        />
      </Grid>

      <Grid item xs={12} md={12}>
        <Box
          sx={{
            display: "flex",
            marginBottom: 5,
            whiteSpace: "nowrap",
          }}
        >
          <TextField
            sx={{ marginRight: 1 }}
            label="GPS coordinates"
            variant="outlined"
            size="small"
            disabled={true}
            fullWidth
            value={location?.latitude + "," + location?.longitude}
          />

          <LoadingButton
            loading={loading}
            type="submit"
            variant="contained"
            sx={{ marginLeft: 1, paddingX: 3 }}
            size="small"
            disabled={
              !form.valid || (intention === "edit" ? !isEditing : false)
            }
            onClick={handleSubmit}
          >
            Submit
          </LoadingButton>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CreateUpdateFormComponent;
