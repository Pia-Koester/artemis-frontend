import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import { useState } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import Toast from "../../components/messages/Toast";

//TO DO: labels mit deutschen Fragestellungen formulierungen
//TO DO: Test registrierungsschritte ohne Wörter

export default function Signup() {
  const [step, setStep] = useState(1);
  const [loginInfo, setLoginInfo] = useState();
  const [personalInfo, setPersonalInfo] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const registrationSubmit = (data) => {
    console.log(data, step);
    setLoginInfo(data);
    setStep((prev) => {
      return prev + 1;
    });
  };

  const personalSubmit = (data) => {
    console.log(data, step);
    setPersonalInfo(data);
    setStep((prev) => {
      return prev + 1;
    });
  };

  const formSubmit = (data) => {
    console.log(loginInfo, personalInfo);
    console.log("Data from form", data);
    axiosClient
      .post("signup", data)
      .then((response) => {
        console.log("Data from api", response.data);
        Toast("Anmeldung erfolgreich");
        // setTimeout(() => {
        //   navigate("/login");
        // }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBacksteps = () => {
    setStep((prev) => {
      return prev - 1;
    });
  };

  const nextClasses = {
    3: "hidden",
    4: "hidden",
  };

  const backClasses = {
    1: "hidden",
  };

  const submitClasses = { 1: "hidden", 2: "hidden" };

  const handleShowPassword = () => {
    setShowPassword(true);
  };
  const handleHidePassword = () => {
    setShowPassword(false);
  };

  return (
    <AnimatePresence>
      <div>
        <div className="flex justify-center items-center md:flex-row flex-col ">
          <div className="flex flex-col items-center justify-center md:w-4/12 p-4 h-100 ">
            <h1 className="text-4xl mb-6 font-titleFont font-bold">Sign Up</h1>
            <ul className="steps steps-horizontal my-5">
              <li
                className={clsx(
                  "step px-10 ",
                  (step === 1 || step === 2 || step === 3) && "step-primary"
                )}
              >
                <span className="hidden md:block"> Login</span>
              </li>
              <li
                className={clsx(
                  "step",
                  (step === 2 || step === 3) && "step-primary"
                )}
              >
                <span className="hidden md:block"> Kontakt</span>
              </li>
              <li className={clsx("step", step === 3 && "step-primary")}>
                <span className="hidden md:block"> Abschluss</span>
              </li>
            </ul>
            {step === 1 ? (
              <form
                onSubmit={handleSubmit(registrationSubmit)}
                className=" signup form-control w-full max-w-xs  flex flex-col items-center justify-center"
              >
                <div className="login-info ">
                  <div className="label self-start">
                    <span className="label-text">
                      Gib deine E-Mail Adresse an
                    </span>
                  </div>
                  <input
                    placeholder="E-Mail"
                    className="input input-bordered w-58 max-w-xs input-primary "
                    {...register("email", {
                      required: "E-mail ist erforderlich",
                      pattern: {
                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/,
                        message: "Das ist keine gültige E-Mail-Adresse",
                      },
                    })}
                  />
                  {errors.email?.type === "required" && (
                    <p className="label w-full self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                      {errors.email.message}
                    </p>
                  )}
                  {errors.email?.type === "pattern" && (
                    <p className="label w-full self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                      {errors.email.message}
                    </p>
                  )}

                  <div className="label self-start">
                    <span className="label-text">Wähle ein Passwort</span>
                  </div>
                  <div className="flex relative mr-7 items-center ">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Passwort"
                      className="input input-bordered w-full max-w-xs input-primary "
                      {...register("password", {
                        required: "Passwort ist erforderlich",
                        minLength: {
                          value: 8,
                          message:
                            "Passwörter müssen mindestens 8 Zeichen lang sein",
                        },
                      })}
                    />
                  </div>

                  {errors.password?.type === "required" && (
                    <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                      {errors.password.message}
                    </span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                      {errors.password.message}
                    </span>
                  )}
                  <div className="label self-start">
                    <span className="label-text">Bestätige dein Passwort</span>
                  </div>
                  <div className="flex relative mr-7 items-center ">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Passwort"
                      className="input input-bordered w-full max-w-xs input-primary"
                      {...register("confirmPassword", {
                        required: "Bitte Passwort bestätigen",
                        validate: (value) =>
                          value === watch("password") ||
                          "Passwörter stimmen nicht überein",
                      })}
                    />
                  </div>
                  {errors.confirmPassword?.type === "required" && (
                    <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                  {errors.confirmPassword?.type === "validate" && (
                    <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                  {/* TO DO: Password strength indicator */}
                </div>
                <button
                  disabled={Object.keys(errors).length > 0}
                  className={clsx(
                    "btn btn-primary self-center mt-2",
                    nextClasses[step]
                  )}
                >
                  Weiter
                </button>
              </form>
            ) : step === 2 ? (
              <form
                onSubmit={handleSubmit(personalSubmit)}
                className=" signup form-control w-full max-w-xs  flex flex-col items-center justify-center"
              >
                <label>
                  {/* ATTENTION: this label is here so that the data from the first input is not being used from the first form or send to the third. Unclear why we need it */}
                  <div className="personal-details">
                    <div className="label self-start">
                      <span className="label-text">Vorname</span>
                    </div>
                    <input
                      placeholder="Vorname"
                      className="input input-bordered w-full max-w-xs input-primary "
                      {...register("firstName", {
                        required: "Gib deinen Vornamen an",
                      })}
                    />
                    {errors.firstName?.type === "required" && (
                      <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                        {errors.firstName.message}
                      </span>
                    )}
                    <div className="label self-start">
                      <span className="label-text">Nachname</span>
                    </div>
                    <input
                      placeholder="Nachname"
                      className="input input-bordered w-full max-w-xs input-primary "
                      {...register("lastName", {
                        required: "Gib deinen Nachnamen an",
                      })}
                    />{" "}
                    {errors.lastName?.type === "required" && (
                      <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                        {errors.lastName.message}
                      </span>
                    )}
                    <div className="label self-start">
                      <span className="label-text">
                        Wie ist deine Telefonnummer?
                      </span>
                    </div>
                    <input
                      placeholder="Telefonnummer"
                      className="input input-bordered w-full max-w-xs input-primary "
                      {...register("phoneNumber", {
                        required: "Gib bitte deine Telefonnummer an",
                        pattern: {
                          value: /^[0-9]*$/,
                          message:
                            "Deine Telefonnummer darf nur aus Zahlen bestehen",
                        },
                      })}
                    />{" "}
                    {errors.phoneNumber?.type === "required" && (
                      <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                        {errors.phoneNumber.message}
                      </span>
                    )}{" "}
                    {errors.phoneNumber?.type === "pattern" && (
                      <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                        {errors.phoneNumber.message}
                      </span>
                    )}
                    <div className="label self-start">
                      <span className="label-text">Straße und Hausnummer</span>
                    </div>
                    <input
                      placeholder="Straßenname und Hausnummer"
                      className="input input-bordered w-full max-w-xs input-primary "
                      {...register("street", {
                        required:
                          "Stassenname und Hausnummer sind erforderlich",
                      })}
                    />{" "}
                    {errors.street?.type === "required" && (
                      <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                        {errors.street.message}
                      </span>
                    )}
                    <div className="label self-start">
                      <span className="label-text">Postleitzahl</span>
                    </div>
                    <input
                      placeholder="Postleitzahl"
                      className="input input-bordered w-full max-w-xs input-primary "
                      {...register("postalCode", {
                        required: "Postleitzahl ist erforderlich",
                        pattern: {
                          value: /^[0-9]{5}$/,
                          message:
                            "Deine Postleitzahl darf nur aus Zahlen bestehen",
                        },
                      })}
                    />{" "}
                    {errors.postalCode?.type === "required" && (
                      <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                        {errors.postalCode.message}
                      </span>
                    )}
                    {errors.postalCode?.type === "pattern" && (
                      <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                        {errors.postalCode.message}
                      </span>
                    )}
                    <div className="label self-start">
                      <span className="label-text">Stadt</span>
                    </div>
                    <input
                      placeholder="Stadt"
                      className="input input-bordered w-full max-w-xs input-primary "
                      {...register("city", {
                        required: "Stadt ist erforderlich",
                      })}
                    />{" "}
                    {errors.city?.type === "required" && (
                      <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                        {errors.city.message}
                      </span>
                    )}
                  </div>{" "}
                  <div className="flex justify-around mt-2">
                    <button
                      className={clsx("btn btn-neutral", backClasses[step])}
                      onClick={handleBacksteps}
                    >
                      Zurück
                    </button>
                    <button
                      disabled={Object.keys(errors).length > 0}
                      className={clsx(
                        "btn btn-primary self-center",
                        nextClasses[step]
                      )}
                    >
                      Weiter
                    </button>
                  </div>
                </label>
              </form>
            ) : (
              <form onSubmit={handleSubmit(formSubmit)}>
                {" "}
                <div className="label self-start">
                  <span className="label-text">
                    Verrate uns dein Geburtsdatum
                  </span>
                </div>
                <input
                  placeholder="Date of Birth"
                  className="input input-bordered w-full max-w-xs input-primary "
                  type="date"
                  {...register("dateOfBirth", {
                    required: "Gib dein Geburtsdatum an",
                  })}
                />
                {errors.dateOfBirth?.type === "required" && (
                  <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    {errors.dateOfBirth.message}
                  </span>
                )}
                <div className="label cursor-pointer">
                  <span className="label-text">Ich stimme den AGBs zu </span>
                  <input
                    type="checkbox"
                    className="toggle toggle-secondary"
                    {...register("termsOfUse", {
                      required: "You must agree to the AGB",
                    })}
                  />
                </div>
                {errors.termsOfUse?.type === "required" && (
                  <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    {errors.termsOfUse.message}
                  </span>
                )}
                <div className="label cursor-pointer">
                  <span className="label-text">
                    Ich habe die Datenschutzbestimmungen gelesen
                  </span>
                  <input
                    type="checkbox"
                    className="toggle toggle-secondary"
                    {...register("dataProtectionInfo", {
                      required: "You must agree to the DSGVO",
                    })}
                  />
                </div>
                {errors.dataProtectionInfo?.type === "required" && (
                  <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    {errors.dataProtectionInfo.message}
                  </span>
                )}
                <div className="flex justify-around mt-2">
                  <button
                    className={clsx("btn btn-neutral", backClasses[step])}
                    onClick={handleBacksteps}
                  >
                    Zurück
                  </button>

                  <button
                    className={clsx(
                      "btn btn-primary self-center",
                      submitClasses[step]
                    )}
                  >
                    Anmelden
                  </button>
                </div>
              </form>
            )}
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
          Already registered?{" "}
          <Link to="/login" className="text-accent ">
            Login
          </Link>
        </p>
      </div>
    </AnimatePresence>
  );
}
