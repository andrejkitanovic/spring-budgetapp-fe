import React from "react";

import dayjs from "dayjs";
import Layout from "components/Layout/Layout";
import { useQuery } from "react-query";
import { getLogs } from "api/log";

const Settings = () => {
  const { data: logs } = useQuery("logs-all", async () => {
    const res = await getLogs();

    return res.data;
  });

  return (
    <Layout>
      <div className="text-2xl mb-10 font-bold">Logs</div>

      <table className="w-full text-sm text-left text-gray-500 border ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          <tr>
            <th scope="col" className="px-6 py-3">
              Attempt ID
            </th>
            <th scope="col" className="px-6 py-3">
              Success
            </th>
            <th scope="col" className="px-6 py-3">
              Occured
            </th>
          </tr>
        </thead>
        <tbody>
          {logs?.map((log) => (
            <tr className="bg-white border-b ">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap"
              >
                {log.id}
              </th>
              <td className="px-6 py-4">
                {log.success ? "Successful" : "Unsuccessful"}
              </td>
              <td className="px-6 py-4">
                {dayjs(log.date).format("DD. MM. YYYY HH:MM:ss")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Settings;
