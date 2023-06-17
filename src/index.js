import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import Verification from "./components/Verification";
import Registration from "./components/Registration";
import ErrorPage from "./components/ErrorPage";
import Success from "./components/Success";
// import App from "./App";
import Portal, { loader as portalLoader } from "./components/Portal";
// import 'bootstrap/dist/css/bootstrap/min/css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/**
 * TODO's
 * children routers
 * proper contacting
 * make 'exists' port
 * better styling
 * replace error catching
 * portal refresh
 * fix ./mvnw perms
 */

const router = createBrowserRouter([
  {
    path: "/",
    element: <Verification />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/success",
    element: <Success />,
  },
  {
    path: "/portal/:username",
    element: <Portal />,
    loader: portalLoader,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
