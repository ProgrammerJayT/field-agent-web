import { BASE_URL } from "../defaults/baseUrl";
import axios from "axios";

export const getCustomersViews = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/get-customers-views`);

    console.log("Res", res);

    return res.data.views;
  } catch (error) {
    return error;
  }
};
