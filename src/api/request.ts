import axios from "axios";
import { APICall } from "./utils";

const defaultValues = {
  baseURL: `${process.env.REACT_APP_API_URL}`,
};

export const axiosClient = axios.create(defaultValues);

export default axiosClient;

export type { APICall };
