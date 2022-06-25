import React, { useEffect } from "react";

import Layout from "components/Layout/Layout";
import { Field, Form, Formik } from "formik";
import { useNotes } from "./useNotes";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const navigate = useNavigate();
  const {
    editNote,
    notes,
    handleAdd,
    handleDelete,
    handleEditNote,
    handleEdit,
    cancelEdit,
  } = useNotes();

  useEffect(() => {
    if (!localStorage.getItem("user_id")) {
      navigate("/login");
    }
  }, [navigate]);

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
        {notes?.map((note) => {
          const isEdit = editNote === note.id;

          if (isEdit) {
            return (
              <Formik
                initialValues={note}
                onSubmit={async (values) => {
                  await handleEditNote(values, note.id);
                  cancelEdit();
                }}
              >
                <Form className="border-2 py-5 pb-3 px-5 bg-yellow-100 rounded-md border-blue-500 mb-2">
                  <div className="font-medium">
                    <Field
                      name="description"
                      placeholder="Description"
                      className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:ring-1"
                    />
                  </div>
                  <div className="flex">
                    <button
                      className="text-green-500 text-sm pt-2 cursor-pointer mr-2"
                      type="submit"
                    >
                      Save
                    </button>
                    <div
                      className="text-blue-500 text-sm pt-2 cursor-pointer mr-2"
                      onClick={cancelEdit}
                    >
                      Cancel Edit
                    </div>
                    <div
                      className="text-red-500 text-sm pt-2 cursor-pointer"
                      onClick={() => handleDelete(note.id)}
                    >
                      Delete
                    </div>
                  </div>
                </Form>
              </Formik>
            );
          }

          return (
            <div className="border-2 py-5 pb-3 px-5 bg-yellow-100 rounded-md mb-2">
              <div className="font-medium">{note.description}</div>
              <div className="flex">
                <div
                  className="text-blue-500 text-sm pt-2 cursor-pointer mr-2"
                  onClick={() => handleEdit(note.id)}
                >
                  Edit
                </div>
                <div
                  className="text-red-500 text-sm pt-2 cursor-pointer"
                  onClick={() => handleDelete(note.id)}
                >
                  Delete
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Notes;
