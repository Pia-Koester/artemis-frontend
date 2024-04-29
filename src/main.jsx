import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import axiosClient from "./api/axiosClient";

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
import Bookingconfirmation from "./pages/activities/Bookingconfirmation";
import { MembershipOverview } from "./pages/memberships/MembershipOverview";
import Protected from "./layout/Protected";
import UserMemebershipOverview from "./pages/memberships/UserMembershipOverview";
import UserActivityOverview from "./pages/user/UserActivityOverview";
import CreateActivity from "./components/admin/CreateActivity";

//Importing loader function
import { getActivities, getActivity } from "./api/activities";
import { getMembershipPlans } from "./api/memberships";
import Authorize from "./layout/Authorize";

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
            path: "details/:id/confirmation",
            element: <Bookingconfirmation />,
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
          {
            path: "angebote",
            element: <MembershipOverview />,
            loader: getMembershipPlans,
          },
          {
            path: "/user",
            element: <Protected />,
            children: [
              { path: "memberships", element: <UserMemebershipOverview /> },
              { path: "gebucht", element: <UserActivityOverview /> },
            ],
          },
          {
            path: "/admin",
            element: <Authorize role={"admin"} />,
            children: [
              {
                path: "createactivity",
                element: <CreateActivity />,
                loader: async () => {
                  return await axiosClient.get(`/types`);
                },
              },
            ],
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
