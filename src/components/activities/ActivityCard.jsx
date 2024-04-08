import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import CapacityBadge from "./CapacityBadge";
import { useState, useContext } from "react";
import clsx from "clsx";
import { AuthContext } from "../context/AuthProvider";
import { PencilIcon, UsersIcon } from "@heroicons/react/24/outline";

export default function ActivityCard({ activity, role = "student", isBooked }) {
  const navigate = useNavigate();

  //calculating the start time based on the provided date
  const startTime = new Date(activity.startTime);
  const formattedStartTime = startTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const startMilliseconds = startTime.getTime();

  //calculate duration based on start and end date in milliseconds
  const endTime = new Date(activity.endTime);
  const endMilliseconds = endTime.getTime();
  const duration = Math.ceil(
    ((endMilliseconds - startMilliseconds) / (1000 * 60) / 10) * 10
  );

  //change color of card based on if the time and day have already passed
  const today = new Date();

  const [past, setPast] = useState(startTime < today);

  //open Slots for capacity badge
  const [openSlots, setOpenSlots] = useState(
    activity.capacity - activity.registeredUsers.length
  );

  //getting user info to check if class is booked or not
  const { user } = useContext(AuthContext);

  return (
    <>
      <motion.div
        whileHover={past ? {} : { scale: 1.1 }}
        className={clsx(
          "card mb-2  w-full  text-primary-content flex flex-col shadow-lg bg-gradient-to-l from-primary to-[#77cfe5] p-2 relative",
          past && "opacity-40"
          // isBooked && "bg-gradient-to-r from-success to-[#3fea8c]",
          // !past && !isBooked && "bg-gradient-to-r from-primary to-[#7ddaf2] "
        )}
      >
        {/* QUESTION: Why is the text running outside the box on medium sizes?  */}
        <Link
          onClick={(e) => {
            e.preventDefault();
            if (!past) navigate(`/details/${activity._id}`);
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
              {role === "admin" && !past && (
                <button>
                  <PencilIcon className="w-4" />
                </button>
              )}
            </div>
            <div className="flex flex-row-reverse justify-center items-center gap-2 m-2">
              <div className="avatar self-center ">
                <div className="w-20 mask mask-hexagon ">
                  <img src={activity.instructor?.image?.url} />
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center my-3">
              <div className="flex gap-1 items-center">
                <UsersIcon className="w-5" />
                <p>{activity?.registeredUsers?.length}</p>
              </div>

              <CapacityBadge openSlots={openSlots} isBooked={isBooked} />
            </div>
          </div>
        </Link>
      </motion.div>
    </>
  );
}
