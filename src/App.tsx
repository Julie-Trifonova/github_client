import React from "react";

import { Repositories, RepositoryDescription } from "components";
import { Routes, Route, HashRouter } from "react-router-dom";

import "styles/App.scss";

const App = () => {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Repositories />} />
          <Route
            path="/repo/:organization/:repo"
            element={<RepositoryDescription />}
          />
          <Route path="/repos/:organization" element={<Repositories />} />
        </Routes>
      </HashRouter>
    </>
  );
};

export default App;
