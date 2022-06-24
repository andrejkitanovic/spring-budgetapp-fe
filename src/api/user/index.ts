import request, { APICall } from "../request";
import { RegisterPayload, LoginPayload, UserType } from "./types";

export const getUsers = (): APICall<UserType[]> =>
  request({
    url: `/users`,
    method: "GET",
  });

export const getSingleUser = (userId: string): APICall<UserType> =>
  request({
    url: `/users/${userId}`,
    method: "GET",
  });

export const getMe = (): APICall<UserType> =>
  request({
    url: `/users/me`,
    method: "GET",
  });

export const postLogin = (user: LoginPayload): APICall<UserType> =>
  request({
    url: `/users/login`,
    method: "POST",
    data: user
  });

export const postRegister = (user: RegisterPayload): APICall<UserType> =>
  request({
    url: `/users/register`,
    method: "POST",
    data: user
  });
