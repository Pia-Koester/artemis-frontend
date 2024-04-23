import clsx from "clsx";

export default function CapacityBadge({ openSlots, isBooked }) {
  //colors for conditional capacity badge

  const badgeClass = clsx({
    "inline-flex items-center justify-center mr-3 min-w-[110px] text-xs font-semibold px-2.5 py-0.5 rounded-full dark:text-gray-300": true,
    "bg-neutral text-white": isBooked,
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900":
      openSlots > 4 && !isBooked,
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900":
      openSlots <= 4 && openSlots > 2 && !isBooked,
    "bg-red-100 text-red-800 dark:bg-red-900": openSlots <= 2 && !isBooked,
  });

  return (
    <div className="m-2">
      <span className={badgeClass}>
        {openSlots > 4 && !isBooked && (
          <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
        )}
        {openSlots <= 4 && openSlots > 2 && !isBooked && (
          <span className="w-2 h-2 me-1 bg-yellow-500 rounded-full"></span>
        )}
        {openSlots <= 2 && !isBooked && (
          <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
        )}
        {isBooked
          ? "Gebucht"
          : `${openSlots} ${openSlots !== 1 ? "Plätze" : "Platz"} frei`}
      </span>
    </div>
  );
}
