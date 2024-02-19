import { BASE_URL } from "../defaults/baseUrl";
import axios from "axios";

export const createCustomer = async (customer) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/v1/users`, {
      name: customer.name,
      surname: customer.surname,
      email: customer.email,
      latitude: customer.latitude,
      longitude: customer.longitude,
      role: customer.role,
    });

    return res.data;
  } catch (error) {
    return error;
  }
};
