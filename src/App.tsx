import React from "react";

import "@styles/App.scss";
import Repositories from "@components/repositories/Repositories";
import { RepositoryDescription } from "@components/repositories/repositoryDescription";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
          {/*<Route path="*" element={<Navigate to="/" replace />} />*/}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
