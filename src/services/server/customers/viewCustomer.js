import { BASE_URL } from "../defaults/baseUrl";
import axios from "axios";

export const viewCustomer = async (id) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/api/v1/create-customers-views/${id}`
    );

    console.log("Res", res);
    return res;
  } catch (error) {
    return error;
  }
};
