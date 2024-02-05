import { verifyToken } from "../../services/server/auth/verifyToken";

export const checkUser = async () => {
  if (!localStorage.getItem("token")) return false;

  return await verifyToken();
};
