import { useState } from "react";

import { deleteSingleNote, getNotes, postNote } from "api/note";
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

  const handleEdit = (id: number) => {
    setEditNote(id);
  };
  const cancelEdit = () => {
    setEditNote(null);
  };

  return { editNote, notes, handleAdd, handleDelete, handleEdit, cancelEdit };
};
