import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

import { AuthContext } from "../../Context/AuthProvider";
import { handleCancelation } from "../../api/activities";
import Toast from "../messages/Toast";

//importing date-fns functions
import { format, differenceInMinutes, isPast } from "date-fns";

//importing components
import CapacityBadge from "./CapacityBadge";

export default function BookedActivityCard({
  activity,
  role = "student",
  isBooked,
}) {
  const navigate = useNavigate();

  // Calculating the start time based on the provided date
  const startTime = new Date(activity.startTime);
  const formattedStartTime = format(startTime, "HH:mm");
  const formattedStartDate = format(startTime, "dd.MM.yyyy");

  // Calculate duration based on start and end date in minutes
  const endTime = new Date(activity.endTime);
  const duration = Math.ceil(differenceInMinutes(endTime, startTime) / 10) * 10;

  //open Slots for capacity badge
  const [openSlots, setOpenSlots] = useState(
    activity.capacity - activity.registeredUsers.length
  );

  //getting user info to check if class is booked or not
  const { user, setUser } = useContext(AuthContext);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.1 }}
        className={
          "card mb-2  w-96  text-primary-content flex flex-col shadow-lg bg-gradient-to-l from-primary to-[#77cfe5] p-2 relative"
        }
      >
        <Link
          onClick={(e) => {
            e.preventDefault();
            navigate(`/details/${activity._id}/confirmation`);
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
              <p>{formattedStartDate}</p>
              <p>
                {formattedStartTime} <span>&middot;</span> {duration} Min.{" "}
              </p>
            </div>
            <div className="flex justify-center items-center my-3">
              <CapacityBadge openSlots={openSlots} isBooked={isBooked} />
            </div>
          </div>
        </Link>
        <button
          className="btn btn-secondary w-1/2 self-center mt-2"
          onClick={() => {
            handleCancelation(activity._id, setUser);
            Toast("Deletion Successfull");
          }}
        >
          Abmelden
        </button>
      </motion.div>
    </>
  );
}
