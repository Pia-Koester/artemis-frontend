import { useLoaderData, useSearchParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
// import { PlusCircleIcon } from "@heroicons/react/24/outline";
import axiosClient from "../../api/axiosClient";
import clsx from "clsx";

//importing components
import ActivityCard from "../../components/activities/ActivityCard";

export default function ClassSchedule() {
  const response = useLoaderData();
  const activities = response.activities;
  console.log(activities);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [instructors, setInstructors] = useState([]);

  //Instructor getting for filter
  useEffect(() => {
    axiosClient
      .get("/instructors")
      .then((response) => {
        setInstructors(response.data);
      })
      .catch((error) => {
        console.log(error);
        setUser(null);
      });

    axiosClient
      .get("/types")
      .then((response) => {
        setActivitytypes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //array of weekdays for the grid columns
  const weekdays = [
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
    "Sonntag",
  ];

  //functionality to make sure to filter based on week or trainer
  const [searchParams, setSearchParams] = useSearchParams();
  const [trainer, setTrainer] = useState();
  const [skip, setSkip] = useState(0);
  const [worktouttype, setWorkouttype] = useState("");

  //function to take care of trainer filter
  const handleTrainer = (e) => {
    setWorkouttype("All");
    setTrainer(e.target.value);
    if (skip !== 0) {
      setSearchParams(`skip=${skip}&instructor=${e.target.value}`);
    } else {
      setSearchParams(`instructor=${e.target.value}`);
    }
  };

  //function to take care of activitytyp /workouttype filter
  const [activitytypes, setActivitytypes] = useState([]);
  const handleType = (e) => {
    setTrainer("All");
    setWorkouttype(e.target.value);
    if (skip !== 0) {
      setSearchParams(`skip=${skip}&type=${e.target.value}`);
    } else {
      setSearchParams(`type=${e.target.value}`);
    }
  };

  //pagination based on week logic
  const handleNext = () => {
    setSkip((prev) => {
      const newSkip = prev + 1;
      if (trainer) {
        setSearchParams(`skip=${prev + 1}&instructor=${trainer}`);
      } else {
        setSearchParams(`skip=${prev + 1}`);
      }
      return newSkip;
    });
  };
  const handlePrev = () => {
    setSkip((prev) => {
      const newSkip = prev - 1;
      if (trainer) {
        setSearchParams(`skip=${prev - 7}&instructor=${trainer}`);
      } else if (worktouttype) {
        `skip=${prev - 1}&type=${worktouttype}`;
      } else {
        setSearchParams(`skip=${prev - 1}`);
      }
      return newSkip;
    });
  };

  return (
    <div className="flex gap-3 flex-col items-center p-5">
      <h1 className="text-4xl mb-6 font-titleFont font-bold text-center">
        Buche deinen nächsten Kurs
      </h1>{" "}
      <div className="flex flex-col md:flex-row w-full gap-2 md:justify-center items-center">
        <div className="join">
          <button className="join-item btn" onClick={handlePrev}>
            «
          </button>
          <button className="join-item btn">
            {response.weekstart} - {response.weekend}
          </button>
          <button className="join-item btn" onClick={handleNext}>
            »
          </button>
        </div>
        <select
          className="select select-secondary sm:self-start"
          onChange={handleTrainer}
          value={trainer}
        >
          <option value="All">Trainer:in</option>

          {instructors.map((instructor) => {
            return (
              <option key={instructor.firstName} value={instructor._id}>
                {instructor.firstName}
              </option>
            );
          })}
        </select>
        <select
          className="select select-secondary sm:self-start"
          onChange={handleType}
          value={worktouttype}
        >
          <option value="All"> Kursart</option>
          {activitytypes.map((type) => {
            return (
              <option key={type._id} value={type._id}>
                {type.type.charAt(0).toUpperCase() + type.type.slice(1)}
              </option>
            );
          })}
        </select>
      </div>
      {Object.keys(activities).length === 0 ? (
        <div className="flex justify-center items-center w-full h-96 flex-col">
          <h2 className="text-2xl">
            In dieser Woche werden keine Kurse angeboten.{" "}
          </h2>
          <img
            src="https://res.cloudinary.com/ddj2xpjki/image/upload/v1704646941/Zeus/07081919_1_uakasm.jpg"
            className="w-96 rounded-md"
          />
        </div>
      ) : (
        <div className="grid lg:grid-cols-7 grid-cols-1 gap-4 md:w-full px-10 py-3">
          {weekdays.map((day) => {
            return (
              <div className="flex flex-col gap-2 items-center" key={day}>
                <h3 className="text-xl leading-6 font-medium text-gray-900 font-titleH3">
                  {day}
                </h3>

                {activities[day.toLowerCase()]?.map((activity) => {
                  return (
                    <ActivityCard
                      activity={activity}
                      key={activity._id}
                      role={user?.role}
                      isBooked={activity.registeredUsers.includes(user?._id)}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
