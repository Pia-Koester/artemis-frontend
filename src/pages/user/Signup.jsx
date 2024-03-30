import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axiosClient from "../../api/axiosClient";

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  return (
    // animate presence must surround elements to which framer motion animations should be applied
    <AnimatePresence>
      <div className="flex justify-center items-center">
        <div className="flex flex-col items-center justify-center w-4/12 p-4 h-100 ">
          <h1 className="text-4xl mb-6 font-titleFont font-bold">Sign Up</h1>
        </div>
        <div className="p-4 w-1/3 self-start">
          {/* this animation makes it so that the image appears to swoop in from the left  */}
          <motion.img
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1,
            }}
            exit={{ x: 300, opacity: 0 }}
            src="https://res.cloudinary.com/ddj2xpjki/image/upload/v1704633572/Zeus/isabella.small_gu1hs7.webp"
            className="hidden sm:inline-block object-cover"
          />
        </div>
      </div>
      <p className="p-2 text-center">
        Already registered?{" "}
        <Link to="/login" className="text-accent ">
          Login
        </Link>
      </p>
    </AnimatePresence>
  );
}
