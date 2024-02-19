import { BASE_URL } from "../defaults/baseUrl";
import axios from "axios";
import { headers } from "../defaults/axiosDefaults";

export const login = async (credentials) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/v1/login`, {
      email: credentials.email,
      password: credentials.password,
    });

    if (res?.status === 200) {
      localStorage.setItem("token", res.data.token);
      headers();
    }

    return res;
  } catch (error) {
    return error;
  }
};
