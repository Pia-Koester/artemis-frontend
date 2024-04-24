import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../../components/messages/Modal";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <AnimatePresence>
      <div>
        <div className="flex justify-center items-center md:flex-row flex-col">
          <div className="flex flex-col items-center justify-center md:w-4/12 p-4 h-100 ">
            <motion.img
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 1,
              }}
              exit={{ x: -300, opacity: 0 }}
              src="https://res.cloudinary.com/ddj2xpjki/image/upload/v1704633572/Zeus/isabella.small_gu1hs7.webp"
              className="hidden sm:inline-block object-cover"
            />
          </div>
          <div className="flex flex-col items-center justify-center w-4/12 p-4 h-100 ">
            {" "}
            <h1 className="text-4xl mb-6 font-titleFont font-bold">Login</h1>
            <form
              className="flex flex-col items-center justify-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label className="form-control w-full max-w-xs  flex flex-col items-center justify-center">
                <div className="label self-start">
                  <span className="label-text">Was ist deine E-Mail?</span>
                </div>
                <div className="flex flex-col items-center">
                  <input
                    type="text"
                    placeholder="E-mail hier eingeben"
                    className="input mr-7 input-bordered max-w-xs input-primary "
                    {...register("email", {
                      required: "Ohne E-Mail kein login",
                    })}
                  />
                  {errors.email?.type === "required" && (
                    <p className="label w-full self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="label self-start">
                  <span className="label-text">Wie lautet dein Passwort?</span>
                </div>
                <div className="flex items-center relative mr-7">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Passwort hier eingeben"
                    className="input input-bordered w-full max-w-xs input-primary "
                    {...register("password", {
                      required: "Bitte gib ein Passwort ein",
                    })}
                  />
                </div>
                {errors.password?.type === "required" && (
                  <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    {errors.password.message}
                  </span>
                )}
                <button className="btn btn-primary mt-5">Submit</button>
              </label>
            </form>{" "}
          </div>
          {/* This modal opens if after the login submit the api returns an error - the function to show this model is inside the badCredentials.jsx */}
          <Modal />
        </div>
        <p className="p-2 text-center">
          Du bist noch nicht registriert?{" "}
          <Link to="/signup" className="text-accent">
            Sign up
          </Link>
        </p>
      </div>
    </AnimatePresence>
  );
}
