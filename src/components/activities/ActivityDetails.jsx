import CapacityBadge from "./CapacityBadge";

//importing icons
import { ClockIcon, CalendarIcon, UsersIcon } from "../../assets/icons/Icons";

export default function ActivityDetails({
  activity,
  formattedEndTime,
  formattedStartTime,
  formattedStartDate,
  duration,
  openSlots,
  confirmation,
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center">
      <div className="lg:w-2/3 lg:pr-8">
        <div className="flex gap-2 m-2">
          <CalendarIcon className="w-7" />
          <p className="font-titleH3 font-semibold text-xl">Datum</p>
        </div>
        <p>{formattedStartDate}</p>

        <div className="flex gap-2 m-2">
          <ClockIcon className="w-7" />
          <p className="font-titleH3 font-semibold text-xl">Uhrzeit</p>
        </div>
        <p>
          {formattedStartTime} - {formattedEndTime} ({duration} Min.)
        </p>

        {!confirmation && (
          <div className="flex gap-2 m-2">
            <UsersIcon className="w-7" />
            <p className="font-titleH3 font-semibold text-xl">Verfügbarkeit</p>
          </div>
        )}
        {!confirmation && <CapacityBadge openSlots={openSlots} />}
      </div>

      <div className="lg:w-1/3">
        <div className="avatar self-center mt-3 sm:flex gap-2">
          <div className="w-24 mask mask-hexagon">
            <img
              src={activity.instructor?.image?.url}
              alt={activity.instructor?.firstName}
            />
          </div>
        </div>
        {activity.instructor && (
          <div className="grid grid-rows-2 mt-5 mr-4">
            <p className="font-titleH3 font-semibold text-xl">Instructor:</p>
            <p>{activity.instructor?.firstName}</p>
          </div>
        )}
      </div>
    </div>
  );
}
