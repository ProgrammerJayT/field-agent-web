import { BASE_URL } from "../defaults/baseUrl";
import axios from "axios";

export const verifyToken = async () => {
  try {
    await axios.get(`${BASE_URL}/api/v1/verify-token`);
    return true;
  } catch (error) {
    if (error.response) return false;
  }
};
