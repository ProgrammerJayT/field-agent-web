import { BASE_URL } from "../defaults/baseUrl";
import axios from "axios";

export const getLoggedInUser = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/user`);

    console.log("User res", res);

    return res;
  } catch (error) {

    return error;
  }
};
