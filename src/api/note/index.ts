import request, { APICall } from "../request";
import { NotePayload, NoteType } from "./types";

export const getNotes = (): APICall<NoteType[]> =>
  request({
    url: `/notes`,
    method: "GET",
  });

export const getSingleNote = (noteId: string): APICall<NoteType> =>
  request({
    url: `/notes/${noteId}`,
    method: "GET",
  });

export const postNote = (note: NotePayload): APICall<NoteType> =>
  request({
    url: `/notes`,
    method: "POST",
    data: note,
  });

export const putSingleNote = (
  note: NotePayload,
  noteId: string
): APICall<NoteType> =>
  request({
    url: `/notes/${noteId}`,
    method: "PUT",
    data: note,
  });

export const deleteSingleNote = (noteId: string): APICall<NoteType> =>
  request({
    url: `/notes/${noteId}`,
    method: "DELETE",
  });
