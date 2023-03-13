import axios from "axios";
import { getBaseUrl } from "./functions.utils";

const instance = () => {
  const data = axios.create({
    baseURL: getBaseUrl() + "/collegesuggest/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
};

export default instance;
