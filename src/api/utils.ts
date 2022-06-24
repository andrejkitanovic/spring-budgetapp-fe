import { AxiosResponse } from "axios";

export type APICall<T> = Promise<AxiosResponse<T>>;
