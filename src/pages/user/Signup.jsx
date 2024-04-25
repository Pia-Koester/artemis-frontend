import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import { useState } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import Toast from "../../components/messages/Toast";
import RegistrationForm from "../../components/user/RegistrationForm";

//TO DO: labels mit deutschen Fragestellungen formulierungen
//TO DO: Test registrierungsschritte ohne Wörter

export default function Signup() {
  const [step, setStep] = useState(1);
  const [loginInfo, setLoginInfo] = useState();
  const [personalInfo, setPersonalInfo] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm();

  // const registrationSubmit = (data) => {
  //   console.log(data, step);
  //   setLoginInfo(data);
  //   setStep((prev) => {
  //     return prev + 1;
  //   });
  // };

  // const personalSubmit = (data) => {
  //   console.log(data, step);
  //   setPersonalInfo(data);
  //   setStep((prev) => {
  //     return prev + 1;
  //   });
  // };

  // const formSubmit = (data) => {
  //   console.log(loginInfo, personalInfo);
  //   console.log("Data from form", data);
  //   axiosClient
  //     .post("signup", data)
  //     .then((response) => {
  //       console.log("Data from api", response.data);
  //       Toast("Anmeldung erfolgreich");
  //       // setTimeout(() => {
  //       //   navigate("/login");
  //       // }, 3000);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const handleBacksteps = () => {
  //   setStep((prev) => {
  //     return prev - 1;
  //   });
  // };

  // const nextClasses = {
  //   3: "hidden",
  //   4: "hidden",
  // };

  // const backClasses = {
  //   1: "hidden",
  // };

  // const submitClasses = { 1: "hidden", 2: "hidden" };

  return (
    <AnimatePresence>
      <div>
        <div className="flex justify-center items-center md:flex-row flex-col ">
          <div className="flex flex-col items-center justify-center md:w-4/12 p-4 h-100 ">
            <h1 className="text-4xl mb-6 font-titleFont font-bold">Sign Up</h1>
            <RegistrationForm />
          </div>
          <div className="p-4 w-1/3 self-start">
            <motion.img
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 1,
              }}
              exit={{ x: 300, opacity: 0 }}
              src="https://res.cloudinary.com/ddj2xpjki/image/upload/v1704633572/Zeus/isabella.small_gu1hs7.webp"
              className="hidden md:inline-block object-cover"
            />
          </div>
        </div>

        <p className="p-2 text-center">
          Du bist schon registriert?{" "}
          <Link to="/login" className="text-accent ">
            Login
          </Link>
        </p>
      </div>
    </AnimatePresence>
  );
}
