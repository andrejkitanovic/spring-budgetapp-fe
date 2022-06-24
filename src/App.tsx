import React from "react";

import Routes from "containers/Routes";
import ReactQueryProvider from "components/providers/ReactQueryProvider";

const App = () => {
  return (
    <div className="App">
      <ReactQueryProvider>
        <Routes />
      </ReactQueryProvider>
    </div>
  );
};

export default App;
