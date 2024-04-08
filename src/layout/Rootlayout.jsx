import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "../components/navigation/Footer";
import Navbar from "../components/navigation/Navbar";
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
      <h1>Das ist ein Test von Pia</h1>
      <Navbar />
      <Outlet />
      <Footer />
    </AuthProvider>
  );
}
