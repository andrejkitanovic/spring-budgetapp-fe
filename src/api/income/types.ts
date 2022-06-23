import { UserType } from "api/user/types";

export type IncomeType = {
  id: number;
  description: string;
  value: number;
  date: Date;
  user: UserType;
};
