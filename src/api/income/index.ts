import request, { APICall } from "../request";
import { IncomeType } from "./types";

export const getIncomes = (): APICall<IncomeType> =>
  request({
    url: `/incomes`,
    method: "GET",
  });
