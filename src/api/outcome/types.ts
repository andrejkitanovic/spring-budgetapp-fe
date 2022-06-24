import { UserType } from "api/user/types";

export type OutcomeType = {
  id: number;
  description: string;
  value: number;
  date: Date;
  user: UserType;
};

export type OutcomePayload = {
  description: OutcomeType["description"];
  value: OutcomeType["value"];
  date: OutcomeType["date"];
};
