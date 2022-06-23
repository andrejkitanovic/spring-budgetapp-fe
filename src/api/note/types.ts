import { UserType } from "api/user/types";

export type NoteType = {
  id: number;
  description: string;
  user: UserType;
};
