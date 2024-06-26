import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "../Context/AuthProvider";

export default function Rootlayout() {
  return (
    // This toast container enables us to send success or failure messages on all pages
    // TO DO: remove container from child components and test
    <AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Outlet />
    </AuthProvider>
  );
}
