import { useNavigate, useParams } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { useState, useContext } from "react";
import axiosClient from "../../api/axiosClient";
import { AuthContext } from "../../Context/AuthProvider";
import { format, differenceInMinutes } from "date-fns";
import { de as deLocale } from "date-fns/locale";
import { toast } from "react-toastify";

//importing components
import CapacityBadge from "../../components/activities/CapacityBadge";
import LocationMap from "../../components/activities/LocationMap";
import Modal from "../../components/messages/Modal";
import EditActivity from "../../components/admin/EditActivity";

//importing icons
import {
  Arrowleft,
  MapPinIcon,
  ClockIcon,
  CalendarIcon,
  UsersIcon,
  UserIcon,
} from "../../assets/icons/Icons";
import TrialSessionModal from "../../components/messages/TrialSessionModal";
import ActivityDetails from "../../components/activities/ActivityDetails";
import UserTableRow from "../../components/admin/UserTableRow";

export default function ClassDetails() {
  //in the url parameters the id of the activity is passed - this is used to get the activity details
  const { id } = useParams();
  //to check if the user has already registered for the activity the user needs to be passed
  const { user, setUser } = useContext(AuthContext);

  //getting the activity details
  const activity = useLoaderData();
  console.log("activity", activity);

  //this is the same calculation as in the activity card
  const [openSlots, setOpenSlots] = useState(
    activity.capacity - activity.registeredUsers.length
  );

  // Transforming start time
  const startTime = new Date(activity.startTime);
  const formattedStartTime = format(startTime, "HH:mm"); // Format time as 'HH:mm'
  const formattedStartDate = format(startTime, "EEEE, MMMM do, yyyy", {
    locale: deLocale,
  }); // Format date as 'weekday, month day, year' (e.g., "Monday, January 1st, 2024")

  // Transforming end time
  const endTime = new Date(activity.endTime);
  const formattedEndTime = format(endTime, "HH:mm"); // Format time as 'HH:mm'

  // Calculate duration based on start and end time in minutes
  const duration = Math.ceil(differenceInMinutes(endTime, startTime) / 10) * 10;

  //to use the array of registeredUsers we take them out of the activity object for easier handling
  const registeredUsers = activity?.registeredUsers;

  //booking function which allows users to book the class
  const handleBooking = () => {
    // Log cookies before making the request
    console.log("Cookies:", document.cookie);
    axiosClient
      .put(`/activities/${id}`, {})
      .then((response) => {
        console.log("after successfull booking: ", response.data);
        setOpenSlots(
          response.data.activity.capacity -
            response.data.activity.registeredUsers.length
        );
        console.log("this is the user being set", response.data.user);
        setUser(response.data.user);
      })
      .then(() => {
        navigate(`confirmation`);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Anmeldung fehlgeschlagen", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  //logic for probetraining button to avoid more then allowed users
  const [trialFull, setFull] = useState(
    activity.trialMembership.limitTrialSessions ===
      activity.trialMembership.trialSessionsUsed
  );

  //logic to handle the grid displayed
  const isAdmin = user?.role === "admin";

  // Responsive Grid Layout
  const gridTemplateColumns =
    window.innerWidth > 768 ? (isAdmin ? "1fr 1fr 1fr" : "1fr 1fr") : "1fr";
  const gridTemplateRows =
    window.innerWidth > 768
      ? isAdmin
        ? "1fr 1fr 1fr"
        : "1fr 1fr"
      : "repeat(3, min-content)";
  const gridTemplateAreas =
    window.innerWidth > 768
      ? isAdmin
        ? `"kursinfo kurszeiten edit" "kursinfo nutzer edit" "kursinfo nutzer edit"`
        : `"kursinfo kurszeiten" "kursinfo karte"`
      : `"kursinfo" "kurszeiten" "karte" "nutzer" "edit"`;

  console.log(user);

  //navigate back to the previous page - this is used in the back button
  const navigate = useNavigate();
  return (
    <div className="mb-4">
      {" "}
      <h1 className="text-4xl flex justify-center mb-6 font-titleFont font-bold text-center">
        {activity.title}
      </h1>
      <div className="flex md:flex-row flex-col justify-center items-start">
        {" "}
        <button
          className="btn btn-circle btn-neutral mx-3 mt-2 self-start mb-2"
          onClick={() => navigate(-1)}
        >
          <Arrowleft />{" "}
        </button>
        <div
          className={`grid gap-2 self-start min-h-0 `}
          style={{ gridTemplateColumns, gridTemplateRows, gridTemplateAreas }}
        >
          <div
            className={`Kurs-Informationen card bg-white shadow-xl flex flex-col p-4 min-w-72 `}
            style={{ gridArea: "kursinfo" }}
          >
            <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-base-100 rounded-box">
              {activity.type?.images.map((image) => {
                return (
                  <div className="carousel-item" key={image._id}>
                    <img
                      src={image.url}
                      alt="Pizza"
                      key={image._id}
                      className="object-center	w-96"
                    />
                  </div>
                );
              })}
            </div>
            <p className="mt-4 max-w-md">{activity.description}</p>
          </div>
          <aside
            className={`card bg-white shadow-xl flex flex-col p-4  min-w-96 `}
            style={{ gridArea: "kurszeiten" }}
          >
            <ActivityDetails
              activity={activity}
              id={id}
              formattedStartTime={formattedStartTime}
              formattedEndTime={formattedEndTime}
              formattedStartDate={formattedStartDate}
              duration={duration}
              openSlots={openSlots}
            />

            <div className="flex justify-center flex-wrap">
              {user?.role !== "admin" && (
                <>
                  {!user && trialFull ? (
                    <button
                      className="btn btn-disabled mr-3 self-center mt-2"
                      disabled
                    >
                      Kein Probetraining möglich
                    </button>
                  ) : !user ? (
                    <button
                      className="btn btn-primary mr-3 self-center mt-2"
                      onClick={() =>
                        document.getElementById("trialSession").showModal()
                      }
                      disabled={openSlots <= 0}
                    >
                      Probetraining buchen
                    </button>
                  ) : !user.registeredActivities.find(
                      (activity) => activity._id === id
                    ) ? (
                    <button
                      className="btn btn-primary mr-3 self-center mt-2"
                      onClick={() =>
                        document.getElementById("bookingInfo").showModal()
                      }
                      disabled={openSlots <= 0}
                    >
                      Anmelden
                    </button>
                  ) : (
                    <>
                      <button
                        className="btn btn-secondary mr-3 self-center mt-2"
                        onClick={() =>
                          document.getElementById("my_modal_1").showModal()
                        }
                        disabled={openSlots <= 0}
                      >
                        Cancel Booking
                      </button>{" "}
                    </>
                  )}
                </>
              )}
            </div>

            <Modal
              activity={activity}
              id={id}
              formattedStartTime={formattedStartTime}
              formattedEndTime={formattedEndTime}
              formattedStartDate={formattedStartDate}
              handleBooking={handleBooking}
              duration={duration}
            />
            <TrialSessionModal activity={activity} id={id} />
          </aside>
          {user && user.role === "admin" ? (
            <div
              className="Angemeldete-Nutzer card bg-white shadow-xl flex flex-col p-4 min-w-96 sm:col-start-2  max-h-[550px] overflow-x-auto overflow-y-auto"
              style={{ gridArea: "nutzer" }}
            >
              <div>
                <h3 className="flex justify-center text-2xl leading-6 font-medium text-gray-900 font-titleH3 mb-1">
                  Angemeldete Nutzer:innen
                </h3>
                {registeredUsers.length === 0 ? (
                  <p className="text-center mt-2">
                    Bis jetzt ist niemand angemeldet
                  </p>
                ) : (
                  <table className="table p-2 m-2  max-h-[300px] overflow-x-auto overflow-y-auto">
                    <tbody>
                      {registeredUsers.map((student) => {
                        console.log(student);
                        return (
                          <UserTableRow
                            student={student}
                            key={student._id}
                            activity={activity}
                          />
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          ) : (
            <div
              className="Kursort card bg-white shadow-xl flex flex-col p-4 min-w-96 min-h-60"
              style={{ gridArea: "karte" }}
            >
              <div className="flex gap-2 m-2">
                <MapPinIcon className="w-7" />
                <p className="font-bold">Ort</p>
              </div>
              <LocationMap
                className="w-4/5 self-center"
                location={activity.location}
              />
            </div>
          )}{" "}
          {user && user.role === "admin" && (
            <EditActivity
              activity={activity}
              hideBackButton
              style={{ gridArea: "edit" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
