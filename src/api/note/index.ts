import request, { APICall } from "../request";
import { NoteType } from "./types";

export const getNotes = (): APICall<NoteType> =>
  request({
    url: `/notes`,
    method: "GET",
  });
