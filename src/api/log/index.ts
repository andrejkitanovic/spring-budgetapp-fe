import request, { APICall } from "../request";
import { LogType } from "./types";

export const getLogs = (): APICall<LogType> =>
  request({
    url: `/logs`,
    method: "GET",
  });
