import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

import axios from "axios";

export const fetchCategoriesApi = async () => {
  return await axios.get("http://localhost:3001/categories");
};

