import React from "react";

import { useQuery } from "react-query";
import Layout from "components/Layout/Layout";
import { getIncomes } from "api/income";
import { getOutcomes } from "api/outcome";

const Dashboard = () => {
  const { data: incomes } = useQuery("incomes-all", async () => {
    const res = await getIncomes();

    return res.data;
  });
  const { data: outcomes } = useQuery("outcomes-all", async () => {
    const res = await getOutcomes();

    return res.data;
  });


  const incomesTotal = incomes?.reduce((prev,curr) => prev + curr.value, 0);
  const outcomesTotal = outcomes?.reduce((prev,curr) => prev + curr.value, 0);
  const total = (incomesTotal || 0) - (outcomesTotal || 0);

  return (
    <Layout>
      <div className="text-2xl mb-5 font-bold">Budget</div>

      <div className="text-center mb-8">
        <p className="text-5xl mb-6">${total}</p>
      </div>

      <div className="grid grid-cols-2 bg-white mb-6 border-2 p-6 rounded-md">
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold">INCOMES:</p>
          <p className="text-5xl font-semibold text-green-500">${incomesTotal}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold">EXPENSES:</p>
          <p className="text-5xl font-semibold text-red-500">${outcomesTotal}</p>
        </div>
      </div>

      <div className="bg-white rounded-md w-full mb-6 border-2 p-6">

      </div>

      {/* <div>
          <div className="my-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Add new transaction
            </h3>
            <div className=" flex justify-between bg-white items-center">
              <div className=" md:p-10 py-2 px-4 w-2/3">
                <p className="text-md ">Description</p>
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="New shinny thing"
                    className="p-2 w-full border-2 rounded-md outline-none"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className=" md:p-10 py-2 px-4">
                <p className="text-md ">Value</p>
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="100.00"
                    className="p-2 border-2 w-full rounded-md outline-none"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div> */}
    </Layout>
  );
};

export default Dashboard;
