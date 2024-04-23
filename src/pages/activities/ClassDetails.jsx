import { useNavigate, useParams } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { useState, useContext } from "react";
import axiosClient from "../../api/axiosClient";
import { AuthContext } from "../../Context/AuthProvider";
import { format, differenceInMinutes } from "date-fns";
import { de as deLocale } from "date-fns/locale";

//importing components
import CapacityBadge from "../../components/activities/CapacityBadge";
import LocationMap from "../../components/activities/LocationMap";
import Modal from "../../components/messages/Modal";

//importing icons
import {
  Arrowleft,
  MapPinIcon,
  ClockIcon,
  CalendarIcon,
  UsersIcon,
} from "../../assets/icons/Icons";

export default function ClassDetails() {
  //in the url parameters the id of the activity is passed - this is used to get the activity details
  const { id } = useParams();
  //to check if the user has already registered for the activity the user needs to be passed
  const { user, setUser } = useContext(AuthContext);

  //getting the activity details
  const activity = useLoaderData();

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

  const navigate = useNavigate();
  return (
    <div className="mb-4">
      {" "}
      <h1 className="text-4xl flex justify-center mb-6 font-titleFont font-bold">
        {activity.title}
      </h1>
      <div className="flex md:flex-row flex-col-reverse justify-center items-start">
        {" "}
        <button
          className="btn btn-circle btn-neutral mr-3 mt-2 self-start"
          onClick={() => navigate(-1)}
        >
          <Arrowleft />{" "}
        </button>
        <div
          className={`grid grid-cols-${
            user && user.role === "admin" ? 3 : 2
          } grid-rows-${
            user && user.role === "admin" ? 3 : 2
          } gap-2 self-start min-h-0 `}
        >
          <div
            className={`Kurs-Informationen card bg-white shadow-xl flex flex-col p-4 min-w-72 row-span-${
              user && user.role === "admin" ? 3 : 2
            }`}
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
            className={`card bg-white shadow-xl flex flex-col p-4  min-w-96  row-span-1 `}
          >
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

                <div className="flex gap-2 m-2">
                  <UsersIcon className="w-7" />
                  <p className="font-titleH3 font-semibold text-xl">
                    Verfügbarkeit
                  </p>
                </div>
                <CapacityBadge openSlots={openSlots} />
              </div>

              <div className="lg:w-1/3">
                {/* <div className="avatar self-center mt-3 sm:flex gap-2">
                  <div className="w-24 mask mask-hexagon">
                    <img
                      src={activity.instructor.image.url}
                      alt={activity.instructor.firstName}
                    />
                  </div>
                </div>
                <div className="grid grid-rows-2 mt-5 mr-4">
                  <p className="font-titleH3 font-semibold text-xl">
                    Instructor:
                  </p>
                  <p>{activity.instructor.firstName}</p>
                </div> */}
              </div>
            </div>

            <div className="flex justify-center flex-wrap">
              {user?.role !== "admin" && (
                <>
                  {!user ||
                  !user.registeredActivities.find((activity) => {
                    return activity._id === id;
                  }) ? (
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
              )}{" "}
            </div>
            <Modal
              activity={activity}
              id={id}
              formattedStartTime={formattedStartTime}
              formattedEndTime={formattedEndTime}
              formattedStartDate={formattedStartDate}
            />
            {/* <Bookingmodal
              handleBooking={handleBooking}
              activity={activity}
              id={id}
              formattedStartTime={formattedStartTime}
              formattedEndTime={formattedEndTime}
              formattedStartDate={formattedStartDate}
            /> */}
          </aside>
          {user && user.role === "admin" ? (
            <div className="Angemeldete-Nutzer card bg-white shadow-xl flex flex-col p-4 min-w-96 col-start-2 row-start-2 row-span-2  max-h-[550px] overflow-x-auto overflow-y-auto">
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
                        return (
                          <tr key={student._id}>
                            {/* <th>
                              <div className="avatar">
                                <div className="w-16 rounded-full">
                                  {student.image?.url ? (
                                    <img
                                      alt="User Icon - click to see menu options"
                                      src={student.image?.url}
                                      className="w-full h-full object-cover rounded-full"
                                    />
                                  ) : (
                                    <img
                                      alt="User Icon - click to see menu options"
                                      src={UserIcon}
                                    />
                                  )}
                                </div>
                              </div>
                            </th> */}
                            <td>
                              <div>{student.lastName}</div>
                            </td>
                            <td>{student.firstName}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          ) : (
            <div className="Kursort card bg-white shadow-xl flex flex-col p-4 min-w-96 col-start-2">
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
          {/* {user && user.role === "admin" && (
            <EditActivity activity={activity} hideBackButton />
          )} */}
        </div>
      </div>
    </div>
  );
}
