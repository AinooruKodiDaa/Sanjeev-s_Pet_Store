import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

import axios from "axios";

export const fetchUsersApi = async () => {
  return await axios.get("http://localhost:3001/users");
};

const createPetApi = async (user: any) => {
  return await axios.post("http://localhost:3001/users", user);
};
