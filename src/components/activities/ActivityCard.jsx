import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import clsx from "clsx";
import { AuthContext } from "../../Context/AuthProvider";

//importing date-fns functions
import { format, differenceInMinutes, isPast } from "date-fns";

//importing components
import CapacityBadge from "./CapacityBadge";

//importing icons
import { Pencil } from "../../assets/icons/Icons";

export default function ActivityCard({ activity, role = "student" }) {
  const navigate = useNavigate();

  // Calculating the start time based on the provided date
  const startTime = new Date(activity.startTime);
  const formattedStartTime = format(startTime, "HH:mm");

  // Calculate duration based on start and end date in minutes
  const endTime = new Date(activity.endTime);
  const duration = Math.ceil(differenceInMinutes(endTime, startTime) / 10) * 10;

  //change color of card based on if the time and day have already passed
  const today = new Date();

  //open Slots for capacity badge
  const [openSlots, setOpenSlots] = useState(
    activity.capacity - activity.registeredUsers.length
  );

  //getting user info to check if class is booked or not
  const { user } = useContext(AuthContext);

  //check if user is already booked for the class
  const [isBooked, setIsBooked] = useState(
    user && activity.registeredUsers[0]?.user === user?._id
  );

  return (
    <>
      <motion.div
        whileHover={isPast(startTime) ? {} : { scale: 1.1 }}
        className={clsx(
          "card mb-2  w-full  text-primary-content flex flex-col shadow-lg bg-gradient-to-l from-primary to-[#77cfe5] p-2 relative",
          isPast(startTime) && "opacity-40"
        )}
      >
        <Link
          onClick={(e) => {
            e.preventDefault();
            if (!isPast(startTime)) navigate(`/details/${activity._id}`);
          }}
        >
          <div className="flex flex-col">
            <div className="flex justify-center gap-2 mt-2">
              <img
                src={activity.type?.icon}
                className="w-10"
                alt={activity.type?.type}
                title={activity.type?.type}
              />
            </div>
            <div className="flex justify-center">
              <h2 className="card-title text-wrap font-titleFont mt-2 text-center">
                {activity.title}
              </h2>
            </div>
            <div className="flex justify-center">
              <p>
                {activity?.instructor?.firstName}{" "}
                {activity?.instructor?.lastName}
              </p>
              <p></p>
            </div>{" "}
            <div className="flex mt-1 justify-center gap-5">
              <p>
                {formattedStartTime} <span>&middot;</span> {duration} Min.{" "}
              </p>
              {role === "admin" && !isPast(startTime) && (
                <button>
                  <Pencil className="w-4" />
                </button>
              )}
            </div>
            <div className="flex justify-center items-center my-3">
              <CapacityBadge openSlots={openSlots} isBooked={isBooked} />
            </div>
          </div>
        </Link>
      </motion.div>
    </>
  );
}
