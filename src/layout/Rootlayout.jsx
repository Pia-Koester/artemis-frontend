// import { useContext } from "react";
// import AuthProvider from "../components/context/AuthProvider";
import { Outlet } from "react-router-dom";
//import { ToastContainer } from "react-toastify";

export default function Rootlayout() {
  return (
    // <AuthProvider>
    //   {/* This toast container enables us to send success or failure messages on all pages
    //   TO DO: remove container from child components and test */}
    //   <ToastContainer
    //     position="top-center"
    //     autoClose={1500}
    //     limit={1}
    //     hideProgressBar={false}
    //     newestOnTop={false}
    //     closeOnClick
    //     rtl={false}
    //     pauseOnFocusLoss
    //     draggable
    //     pauseOnHover={false}
    //     theme="light"
    //   />
    <>
      <Outlet />
    </>
    //</AuthProvider>
  );
}
