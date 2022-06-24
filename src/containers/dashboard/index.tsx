import React from "react";

import { Field, Form, Formik } from "formik";
import Layout from "components/Layout/Layout";
import { useDashboard } from "./useDashboard";

const Dashboard = () => {
  const {
    editBudget,
    incomes,
    outcomes,
    incomesTotal,
    outcomesTotal,
    total,
    handleAdd,
    handleDeleteIncome,
    handleDeleteOutcome,
    handleEditIncome,
    handleEditOutcome,
    handleEdit,
    cancelEdit,
  } = useDashboard();

  return (
    <Layout>
      <div className="text-2xl mb-5 font-bold">Budget</div>

      <div className="text-center mb-8">
        <p className="text-5xl mb-6 font-bold text-gray-500">Total: ${total}</p>
      </div>

      <div className="grid grid-cols-2 bg-white mb-6 border-2 p-6 rounded-md">
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold">INCOMES:</p>
          <p className="text-5xl font-semibold text-green-500">
            ${incomesTotal}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold">EXPENSES:</p>
          <p className="text-5xl font-semibold text-red-500">
            ${outcomesTotal}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-md w-full mb-6 border-2 p-6">
        <Formik
          initialValues={{
            type: "income",
            value: "",
            description: "",
          }}
          onSubmit={handleAdd}
        >
          <Form className="flex items-center">
            <div className="w-full mr-6">
              <div>
                <Field
                  as="select"
                  name="type"
                  placeholder="Type"
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:ring-1"
                >
                  <option value="income">+</option>
                  <option value="outcome">-</option>
                </Field>
              </div>
            </div>
            <div className="w-full mr-6">
              <div>
                <Field
                  name="value"
                  type="number"
                  placeholder="Value"
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:ring-1"
                />
              </div>
            </div>
            <div className="w-full mr-6">
              <div>
                <Field
                  name="description"
                  placeholder="Description"
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

      <div className="grid grid-cols-2 bg-white mb-6 border-2 p-6 rounded-md gap-5">
        <div>
          {incomes?.map((income) => {
            const isEdit =
              editBudget?.type === "income" && editBudget.id === income.id;

            if (isEdit) {
              return (
                <Formik
                  initialValues={income}
                  onSubmit={async (values) => {
                    await handleEditIncome(values, income.id);
                    cancelEdit();
                  }}
                >
                  <Form className="bg-gray-50 rounded-md p-4 mb-2 border-2 border-blue-500">
                    <div>
                      Amount:{" "}
                      <Field
                        name="value"
                        type="number"
                        placeholder="Value"
                        className="appearance-none mt-1 mb-3 block w-full px-4 py-3 border border-gray-300 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:ring-1"
                      />
                    </div>
                    <div>
                      Description:{" "}
                      <Field
                        name="description"
                        placeholder="Description"
                        className="appearance-none mt-1 mb-3 block w-full px-4 py-3 border border-gray-300 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:ring-1"
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
                        onClick={() => handleDeleteOutcome(income.id)}
                      >
                        Delete
                      </div>
                    </div>
                  </Form>
                </Formik>
              );
            }

            return (
              <div className="bg-gray-50 rounded-md p-4 mb-2 border-2 border-green-500">
                <div>Amount: ${income.value}</div>
                <div>Description: {income.description}</div>
                <div className="flex">
                  <div
                    className="text-blue-500 text-sm pt-2 cursor-pointer mr-2"
                    onClick={() => handleEdit("income", income.id)}
                  >
                    Edit
                  </div>
                  <div
                    className="text-red-500 text-sm pt-2 cursor-pointer"
                    onClick={() => handleDeleteIncome(income.id)}
                  >
                    Delete
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          {outcomes?.map((outcome) => {
            const isEdit =
              editBudget?.type === "outcome" && editBudget.id === outcome.id;

            if (isEdit) {
              return (
                <Formik
                  initialValues={outcome}
                  onSubmit={async (values) => {
                    await handleEditOutcome(values, outcome.id);
                    cancelEdit();
                  }}
                >
                  <Form className="bg-gray-50 rounded-md p-4 mb-2 border-2 border-blue-500">
                    <div>
                      Amount:{" "}
                      <Field
                        name="value"
                        type="number"
                        placeholder="Value"
                        className="appearance-none mt-1 mb-3 block w-full px-4 py-3 border border-gray-300 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:ring-1"
                      />
                    </div>
                    <div>
                      Description:{" "}
                      <Field
                        name="description"
                        placeholder="Description"
                        className="appearance-none mt-1 mb-3 block w-full px-4 py-3 border border-gray-300 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:ring-1"
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
                        onClick={() => handleDeleteOutcome(outcome.id)}
                      >
                        Delete
                      </div>
                    </div>
                  </Form>
                </Formik>
              );
            }

            return (
              <div className="bg-gray-50 rounded-md p-4 mb-2 border-2 border-red-500">
                <div>Amount: ${outcome.value}</div>
                <div>Description: {outcome.description}</div>
                <div className="flex">
                  <div
                    className="text-blue-500 text-sm pt-2 cursor-pointer mr-2"
                    onClick={() => handleEdit("outcome", outcome.id)}
                  >
                    Edit
                  </div>
                  <div
                    className="text-red-500 text-sm pt-2 cursor-pointer"
                    onClick={() => handleDeleteOutcome(outcome.id)}
                  >
                    Delete
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
