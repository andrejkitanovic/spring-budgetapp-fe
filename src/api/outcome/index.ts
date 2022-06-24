import request, { APICall } from "../request";
import { OutcomePayload, OutcomeType } from "./types";

export const getOutcomes = (): APICall<OutcomeType> =>
  request({
    url: `/outcomes`,
    method: "GET",
  });

export const getSingleOutcome = (outcomeId: string): APICall<OutcomeType> =>
  request({
    url: `/outcomes/${outcomeId}`,
    method: "GET",
  });

export const postOutcome = (outcome: OutcomePayload): APICall<OutcomeType> =>
  request({
    url: `/outcomes`,
    method: "POST",
    data: outcome,
  });

export const putSingleOutcome = (
  outcome: OutcomePayload,
  outcomeId: string
): APICall<OutcomeType> =>
  request({
    url: `/outcomes/${outcomeId}`,
    method: "PUT",
    data: outcome,
  });

export const deleteSingleOutcome = (outcomeId: string): APICall<OutcomeType> =>
  request({
    url: `/outcomes/${outcomeId}`,
    method: "DELETE",
  });
