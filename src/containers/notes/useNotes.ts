import { useState } from "react";

import { deleteSingleNote, getNotes, postNote, putSingleNote } from "api/note";
import { queryCache, useMutation, useQuery } from "react-query";
import { FormikConfig } from "formik";
import { NotePayload } from "api/note/types";

export const useNotes = () => {
  const [editNote, setEditNote] = useState<number | null>(null);

  const { data: notes } = useQuery("notes-all", async () => {
    const res = await getNotes();

    return res.data;
  });

  const [addNote] = useMutation(async (note: NotePayload) => {
    const res = await postNote(note);
    await queryCache.invalidateQueries("notes-all");
    return res.data;
  });

  const handleAdd: FormikConfig<any>["onSubmit"] = async (
    values,
    { resetForm }
  ) => {
    await addNote({
      ...values,
    });
    resetForm();
  };

  const [deleteNote] = useMutation(async (noteId: string) => {
    const res = await deleteSingleNote(noteId);
    await queryCache.invalidateQueries("notes-all");
    return res.data;
  });

  const handleDelete = async (noteId: number) => {
    await deleteNote(JSON.stringify(noteId));
  };

  const [editSingleNote] = useMutation(
    async ({ note, noteId }: { note: NotePayload; noteId: string }) => {
      const res = await putSingleNote(note, noteId);
      await queryCache.invalidateQueries("notes-all");
      return res.data;
    }
  );

  const handleEditNote = async (note: NotePayload, noteId: number) => {
    await editSingleNote({ note, noteId: JSON.stringify(noteId) });
  };

  const handleEdit = (id: number) => {
    setEditNote(id);
  };
  const cancelEdit = () => {
    setEditNote(null);
  };

  return {
    editNote,
    notes,
    handleAdd,
    handleDelete,
    handleEditNote,
    handleEdit,
    cancelEdit,
  };
};
