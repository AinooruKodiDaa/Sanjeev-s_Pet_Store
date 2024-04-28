import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

import axios from "axios";

export const fetchStatesApi = async () => {
  return await axios.get("http://localhost:3001/states");
};

