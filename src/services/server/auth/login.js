import { BASE_URL } from "../defaults/baseUrl";
import axios from "axios";
import { headers } from "../defaults/axiosDefaults";

export const login = async (credentials) => {
  const res = await axios.post(`${BASE_URL}/api/v1/login`, {
    email: credentials.email,
    password: credentials.password,
  });

  console.log("Login res", res);

  return res.data;
};
