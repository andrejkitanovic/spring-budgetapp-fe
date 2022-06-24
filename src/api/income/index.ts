import request, { APICall } from "../request";
import { IncomePayload, IncomeType } from "./types";

export const getIncomes = (): APICall<IncomeType[]> =>
  request({
    url: `/incomes`,
    method: "GET",
  });

export const getSingleIncome = (incomeId: string): APICall<IncomeType> =>
  request({
    url: `/incomes/${incomeId}`,
    method: "GET",
  });

export const postIncome = (income: IncomePayload): APICall<IncomeType> =>
  request({
    url: `/incomes`,
    method: "POST",
    data: income,
  });

export const putSingleIncome = (
  income: IncomePayload,
  incomeId: string
): APICall<IncomeType> =>
  request({
    url: `/incomes/${incomeId}`,
    method: "PUT",
    data: income,
  });

export const deleteSingleIncome = (incomeId: string): APICall<IncomeType> =>
  request({
    url: `/incomes/${incomeId}`,
    method: "DELETE",
  });
