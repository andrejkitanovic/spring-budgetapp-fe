import { UserType } from "api/user/types";

export type LogType = {
  id: number;
  success: boolean;
  date: Date;
  user: UserType;
};
