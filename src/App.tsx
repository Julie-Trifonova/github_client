import React from "react";

import { Repositories, RepositoryDescription } from "components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "styles/App.scss";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Repositories />} />
          <Route
            path="/repo/:organization/:repo"
            element={<RepositoryDescription />}
          />
          <Route path="/repos/:organization" element={<Repositories />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
