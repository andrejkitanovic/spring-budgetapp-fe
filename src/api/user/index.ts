import request, { APICall } from "../request";
import { UserType } from "./types";

export const getUsers = (): APICall<UserType> =>
  request({
    url: `/users`,
    method: "GET",
  });
