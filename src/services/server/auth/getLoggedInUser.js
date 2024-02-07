import { BASE_URL } from "../defaults/baseUrl";
import axios from "axios";

export const getLoggedInUser = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/user`);

    return res.data;
  } catch (error) {
    return error;
  }
};
