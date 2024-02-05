import axios from "axios";

export const headers = () => {
  const token = localStorage.getItem("token");

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axios.defaults.headers.common["Accept"] = "application/json";
};
