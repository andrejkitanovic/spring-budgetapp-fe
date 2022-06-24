import React, { FC, PropsWithChildren } from "react";

import Sidebar from "./Sidebar";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="scroll-top relative flex flex-col flex-1 sm:overflow-y-visible overflow-y-auto overflow-x-hidden bg-gray-100">
        <div className="container mx-auto min-h-screen p-10">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
