import React from "react";

import { Repositories } from "@components/repositories/Repositories";
import { RepositoryDescription } from "@components/repositories/repositoryDescription";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Repositories />} />
          <Route
            path="/repo/:organization/:repo"
            element={<RepositoryDescription />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
