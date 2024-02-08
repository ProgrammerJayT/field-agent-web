import { BASE_URL } from "../defaults/baseUrl";
import axios from "axios";

export const getCustomers = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/users`);

    return res.data;
  } catch (error) {
    return error;
  }
};
