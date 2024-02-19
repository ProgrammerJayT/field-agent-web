import { BASE_URL } from "../defaults/baseUrl";
import axios from "axios";

export const getCustomer = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/customers/${id}`);

    console.log("Res", res);

    return res.data.customer;
  } catch (error) {
    return error;
  }
};
