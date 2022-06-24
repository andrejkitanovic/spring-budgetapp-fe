import React from "react";

import Layout from "components/Layout/Layout";
import { deleteSingleNote, getNotes, postNote } from "api/note";
import { queryCache, useMutation, useQuery } from "react-query";
import { Field, Form, Formik, FormikConfig } from "formik";
import { NotePayload } from "api/note/types";

const Notes = () => {
  const { data: notes } = useQuery("notes-all", async () => {
    const res = await getNotes();

    return res.data;
  });

  const [deleteNote] = useMutation(async (noteId: string) => {
    const res = await deleteSingleNote(noteId);
    await queryCache.invalidateQueries("notes-all");
    return res.data;
  });

  const handleDelete = async (noteId: number) => {
    await deleteNote(JSON.stringify(noteId));
  };

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

  return (
    <Layout>
      <div className="text-2xl mb-10 font-bold">Notes</div>

      <div className="mb-8">
        <Formik
          initialValues={{
            description: "",
          }}
          onSubmit={handleAdd}
        >
          <Form className="flex items-center">
            <div className="w-full mr-6">
              <div>
                <Field
                  name="description"
                  placeholder="Note..."
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:ring-1"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-1/5 inline-flex justify-center py-2.5 px-4 border border-transparent rounded shadow-sm transition-colors font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Add
            </button>
          </Form>
        </Formik>
      </div>

      <div>
        {notes?.map((note) => (
          <div className="border-2 py-5 pb-3 px-5 bg-yellow-100 rounded-md mb-2">
            <div className="font-medium">{note.description}</div>
            <div
              className="text-red-500 text-sm pt-2 cursor-pointer"
              onClick={() => handleDelete(note.id)}
            >
              Delete
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Notes;
