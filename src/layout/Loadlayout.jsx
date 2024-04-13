import { Outlet } from "react-router-dom";
import Footer from "../components/navigation/Footer";
import Navbar from "../components/navigation/Navbar";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";

export default function Loadlayout() {
  const { isLoading } = useContext(AuthContext);

  return (
    <div className="flex flex-col min-h-screen">
      {isLoading ? (
        <h1>lädt noch</h1>
      ) : (
        <>
          <Navbar />
          <Outlet />
          <Footer />
        </>
      )}
    </div>
  );
}
