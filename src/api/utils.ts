import { isEmptyObject } from "../utils/isEmptyObject";
import { AxiosResponse } from "axios";

export type APICall<T> = Promise<AxiosResponse<T>>;

export type PaginationMeta = {
  CurrentPage: number;
  NextPageUrl: string;
  PageSize: number;
  PreviousPageUrl: string;
  TotalPages: number;
  TotalResults: number;
};

export type Paginated<T> = {
  Data: T;
  Meta: {
    Pagination: PaginationMeta;
  };
};

export type QueryParamsSortType<T = Record<string, unknown>> = {
  field: keyof T;
  order: "asc" | "desc";
};

export type QueryParamsSingleFilterType<T = Record<string, unknown>> = {
  field: keyof T;
  operator: "eq" | "neq" | "gt" | "lt" | "gte" | "lte";
  value: boolean | string | null;
};

export type QueryParamsType<T = Record<string, unknown>> = {
  sort?: QueryParamsSortType<T>;
  filter?: QueryParamsSingleFilterType<T>[] | null;
  page?: number;
  limit?: number;
  [key: string]: unknown;
};

const parseParams = <T>(object: QueryParamsType<T>) => {
  const queryParams = new URLSearchParams();
  Object.entries(object).forEach(([key, value]) => {
    if (key === "sort") {
      const sortValue = value as QueryParamsType["sort"];
      if (sortValue) {
        const parsedSort = `${sortValue.field}::${sortValue.order}`;
        queryParams.append("sort", parsedSort);
      }
      return;
    }

    if (key === "filter") {
      const filterValue = value as QueryParamsType["filter"];
      if (filterValue?.length) {
        const parsedFilter = filterValue
          .map(
            ({ field, operator, value }) => `${field}::${operator}::${value}`
          )
          .join(",");
        queryParams.append("filter", parsedFilter);
      }
      return;
    }

    if (value) {
      const otherParamValue = value as string | number;
      queryParams.append(key, otherParamValue.toString());
      return;
    }
  });
  return queryParams;
};

export const normalizeQueryParams = <T>(object?: QueryParamsType<T>) => {
  if (!object) {
    return "";
  }
  if (isEmptyObject(object)) {
    return "";
  }
  return `?${new URLSearchParams(parseParams(object)).toString()}`;
};
