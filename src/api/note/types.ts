import { UserType } from "api/user/types";

export type NoteType = {
  id: number;
  description: string;
  user: UserType;
};

export type NotePayload = {
  description: NoteType["description"];
};
