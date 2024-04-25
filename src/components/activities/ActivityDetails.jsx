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
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
      <div className="lg:w-2/3 lg:pr-8 text-center lg:text-left">
        <div className="flex gap-2 m-2 justify-center sm:justify-start">
          <CalendarIcon className="w-7" />
          <p className="font-titleH3 font-semibold text-xl text-center ">
            Datum
          </p>
        </div>
        <p>{formattedStartDate}</p>

        <div className="flex gap-2 m-2 justify-center sm:justify-start">
          <ClockIcon className="w-7" />
          <p className="font-titleH3 font-semibold text-xl">Uhrzeit</p>
        </div>
        <p>
          {formattedStartTime} - {formattedEndTime} ({duration} Min.)
        </p>

        {!confirmation && (
          <div className="flex gap-2 m-2 justify-center sm:justify-start">
            <UsersIcon className="w-7" />
            <p className="font-titleH3 font-semibold text-xl">Verfügbarkeit</p>
          </div>
        )}
        {!confirmation && <CapacityBadge openSlots={openSlots} />}
      </div>

      <div className="avatar self-center mt-3 sm:flex gap-2 justify-center lg:justify-start lg:w-1/3 lg:pl-8">
        <div className="w-24 mask mask-hexagon">
          <img
            src={activity.instructor?.image?.url}
            alt={activity.instructor?.firstName}
          />
        </div>
      </div>
    </div>
  );
}
