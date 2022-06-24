import axios, { AxiosRequestConfig } from "axios";
import { APICall } from "./utils";

const defaultValues = {
  baseURL: `${process.env.REACT_APP_API_URL}`,
};

export const axiosClient = axios.create(defaultValues);

axiosClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (!config?.headers?.["user"] && config?.headers) {
      config.headers["user"] = localStorage.getItem("user_id") as string;
    }

    return config;
  },
  (err) => Promise.reject(err)
);

export default axiosClient;

export type { APICall };
