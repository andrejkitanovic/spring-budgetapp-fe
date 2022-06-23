import request, { APICall } from "../request";
import { OutcomeType } from "./types";

export const getOutcomes = (): APICall<OutcomeType> =>
  request({
    url: `/outcomes`,
    method: "GET",
  });
