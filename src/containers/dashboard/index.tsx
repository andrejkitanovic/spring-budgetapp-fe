import React from "react";

import { queryCache, useMutation, useQuery } from "react-query";
import { Field, Form, Formik, FormikConfig } from "formik";
import Layout from "components/Layout/Layout";
import { deleteSingleIncome, getIncomes, postIncome } from "api/income";
import { deleteSingleOutcome, getOutcomes, postOutcome } from "api/outcome";
import { IncomePayload } from "api/income/types";
import { OutcomePayload } from "api/outcome/types";

const Dashboard = () => {
  const { data: incomes } = useQuery("incomes-all", async () => {
    const res = await getIncomes();

    return res.data;
  });
  const { data: outcomes } = useQuery("outcomes-all", async () => {
    const res = await getOutcomes();

    return res.data;
  });

  const incomesTotal = incomes?.reduce((prev, curr) => prev + curr.value, 0);
  const outcomesTotal = outcomes?.reduce((prev, curr) => prev + curr.value, 0);
  const total = (incomesTotal || 0) - (outcomesTotal || 0);

  const [addIncome] = useMutation(async (income: IncomePayload) => {
    const res = await postIncome(income);
    await queryCache.invalidateQueries("incomes-all");
    return res.data;
  });

  const [addOutcome] = useMutation(async (outcome: OutcomePayload) => {
    const res = await postOutcome(outcome);
    await queryCache.invalidateQueries("outcomes-all");
    return res.data;
  });

  const handleAdd: FormikConfig<any>["onSubmit"] = async (
    values,
    { resetForm }
  ) => {
    if (values.type === "income") {
      await addIncome({
        description: values.description,
        value: values.value,
        date: new Date(),
      });
    } else {
      await addOutcome({
        description: values.description,
        value: values.value,
        date: new Date(),
      });
    }

    resetForm();
  };

  const [deleteIncome] = useMutation(async (incomeId: string) => {
    const res = await deleteSingleIncome(incomeId);
    await queryCache.invalidateQueries("incomes-all");
    return res.data;
  });

  const handleDeleteIncome = async (incomeId: number) => {
    await deleteIncome(JSON.stringify(incomeId));
  };


  const [deleteOutcome] = useMutation(async (outcomeId: string) => {
    const res = await deleteSingleOutcome(outcomeId);
    await queryCache.invalidateQueries("outcomes-all");
    return res.data;
  });

  const handleDeleteOutcome = async (outcomeId: number) => {
    await deleteOutcome(JSON.stringify(outcomeId));
  };


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
          {incomes?.map((income) => (
            <div className="bg-gray-50 rounded-md p-4 mb-2 border-2 border-green-500">
              <div>Amount: ${income.value}</div>
              <div>Description: {income.description}</div>
              <div
                className="text-red-500 text-sm pt-2 cursor-pointer"
                onClick={() => handleDeleteIncome(income.id)}
              >
                Delete
              </div>
            </div>
          ))}
        </div>
        <div>
          {outcomes?.map((outcome) => (
            <div className="bg-gray-50 rounded-md p-4 mb-2 border-2 border-red-500">
              <div>Amount: ${outcome.value}</div>
              <div>Description: {outcome.description}</div>
              <div
                className="text-red-500 text-sm pt-2 cursor-pointer"
                onClick={() => handleDeleteOutcome(outcome.id)}
              >
                Delete
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
