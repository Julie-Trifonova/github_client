import React from "react";
import ReactDOM from "react-dom/client";

import App from "../src/App";

import "config/configureMobX";
import 'regenerator-runtime';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);

if (module.hot) {
    module.hot.accept();
}