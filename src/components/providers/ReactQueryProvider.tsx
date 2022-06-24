import React, { FC, PropsWithChildren } from "react";
import { ReactQueryDevtools } from "react-query-devtools";

const ReactQueryProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {children}
      {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
    </>
  );
};

export default ReactQueryProvider;
