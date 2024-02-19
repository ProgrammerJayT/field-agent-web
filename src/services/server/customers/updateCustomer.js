import { BASE_URL } from "../defaults/baseUrl";
import axios from "axios";

export const updateCustomer = async (customer) => {
  try {
    const res = await axios.patch(
      `${BASE_URL}/api/v1/customers/${customer.id}`,
      {
        name: customer.name,
        surname: customer.surname,
        email: customer.email,
        latitude: customer.latitude,
        longitude: customer.longitude,
      }
    );

    return res.data;
  } catch (error) {
    return error;
  }
};
