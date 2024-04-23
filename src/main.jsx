import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

//IMPORTING THINGS FOR ROUTER
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Importing pages and layouts
import Rootlayout from "./layout/Rootlayout";
import ErrorPage from "./pages/error/ErrorPage";
import Signup from "./pages/user/Signup";
import Login from "./pages/user/Login";
import Loadlayout from "./layout/Loadlayout";
import ClassSchedule from "./pages/activities/ClassSchedule";
import ClassDetails from "./pages/activities/ClassDetails";

//Importing loader function
import { getActivities, getActivity } from "./api/activities";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Rootlayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Loadlayout />,
        children: [
          {
            path: "",
            element: <ClassSchedule />,
            loader: getActivities,
            index: true,
          },
          {
            path: "details/:id",
            element: <ClassDetails />,
            loader: getActivity,
          },
          {
            path: "signup",
            element: <Signup />,
          },
          {
            path: "login",
            element: <Login />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
