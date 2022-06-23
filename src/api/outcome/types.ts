import { UserType } from "api/user/types";

export type OutcomeType = {
  id: number;
  description: string;
  value: number;
  date: Date;
  user: UserType;
};
