import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { Link } from "react-router-dom";
import {
  Arrowleft,
  MapPinIcon,
  ClockIcon,
  CalendarIcon,
  UsersIcon,
} from "../../assets/icons/Icons";
import { isPast } from "date-fns";
import BookedActivityCard from "../../components/activities/BookedActivityCard";

export default function UserActivityOverview() {
  const {
    user: { registeredActivities },
    setUser,
  } = useContext(AuthContext);

  const [futureTab, setFutureTab] = useState("future"); // State to track active tab
  // Function to handle tab click and update active tab state
  const handleTabClick = (tab) => {
    setFutureTab(tab);
  };

  // Function to filter activities based on futureTab
  const filteredActivities =
    futureTab === "future"
      ? registeredActivities.filter(
          (activity) => !isPast(new Date(activity.startTime))
        )
      : registeredActivities.filter((activity) =>
          isPast(new Date(activity.startTime))
        );

  return (
    <>
      <div className="text-center mb-5">
        <h2 className="text-2xl leading-6 font-medium text-gray-900 font-titleH3">
          Meine gebuchten Kurse
        </h2>
      </div>
      <div className=" flex flex-col items-center gap-4">
        <div role="tablist" className="tabs tabs-boxed">
          <a
            className={`tab ${futureTab === "future" ? "tab-active" : ""}`}
            onClick={() => handleTabClick("future")}
          >
            Ausstehende Kurse
          </a>
          <a
            role="tab"
            className={`tab ${futureTab === "past" ? "tab-active" : ""}`}
            onClick={() => handleTabClick("past")}
          >
            Vergangene Kurse
          </a>
        </div>

        {!registeredActivities ? (
          <span className="loading loading-dots loading-lg"></span>
        ) : registeredActivities.length === 0 ? (
          <div className="flex flex-col items-center justify-center mb-5">
            <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 w-1/3">
              <h5 className="border-b-2 border-neutral-100 px-6 py-3 text-xl font-medium leading-tight dark:border-neutral-600 dark:text-neutral-50">
                Du hast noch keine Kurse gebucht
              </h5>
              <div className="p-6">
                <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50"></h5>
                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                  Melde dich jetzt für einen Kurs an und starte dein Training!
                </p>
                <div className="flex justify-end gap-2">
                  <Link
                    to={"/user/angebote"}
                    type="button"
                    href="#"
                    className="btn btn-primary mr-3 self-center mt-2"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    10er Karten anzeigen
                  </Link>
                  <Link
                    to={"/"}
                    type="button"
                    href="#"
                    className="btn btn-success mr-3 self-center mt-2"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    Kursübersicht anzeigen
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2">
            {filteredActivities.map((activity) => (
              <BookedActivityCard key={activity._id} activity={activity} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
