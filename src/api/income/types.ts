import { UserType } from "api/user/types";

export type IncomeType = {
  id: number;
  description: string;
  value: number;
  date: Date;
  user: UserType;
};

export type IncomePayload = {
  description: IncomeType["description"];
  value: IncomeType["value"];
  date: IncomeType["date"];
};
