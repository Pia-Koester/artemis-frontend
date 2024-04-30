import { Controller, useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Toast from "../../components/messages/Toast";
import axiosClient from "../../api/axiosClient";
import { eachDayOfInterval, addWeeks } from "date-fns";

//import icons
import { Arrowleft } from "../../assets/icons/Icons";

export default function CreateActivity() {
  const { data: activityTypes } = useLoaderData();
  const [formloading, setFormloading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  //getting the instructors to map over them
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/instructors")
      .then((response) => {
        setInstructors(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onSubmit = async (data) => {
    setFormloading(true);
    const { type, startDate, endDate, repeat, anzahl } = data;
    const index = activityTypes.findIndex(
      (activityType) => activityType.type === type
    );
    data.type = activityTypes[index]._id;

    const { startDates, endDates } = generateDates(
      startDate,
      endDate,
      repeat,
      parseInt(anzahl)
    );

    console.log("the Two arrays", startDates, endDates);

    Promise.all(
      startDates.map((start, index) => {
        console.log(start);
        console.log(endDates[index]);
        const activityData = {
          ...data,
          startTime: start,
          endTime: endDates[index],
        };
        console.log(activityData);
        return axiosClient.post("/activities", activityData);
      })
    )
      .then(() => {
        Toast("Creation Successful");
        setFormloading(false);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        notifyFailed();
      });
  };

  const notifyFailed = () =>
    toast.error("--Creation Failed--", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const generateDates = (startDate, endDate, repeat, anzahl) => {
    if (repeat) {
      const startDates = [];
      const endDates = [];
      for (let i = 0; i < anzahl; i++) {
        startDates.push(addWeeks(new Date(startDate), i));
        endDates.push(addWeeks(new Date(endDate), i));
      }
      return { startDates, endDates };
    } else {
      return {
        startDates: [new Date(startDate)],
        endDates: [new Date(endDate)],
      };
    }
  };

  //TO DO: show example of activity details while creating the activity? - Preview mode

  return (
    <div className="flex justify-center items-start mb-4">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-circle btn-neutral mr-3 mt-2 self-start"
      >
        <Arrowleft />
      </button>
      <div className="flex flex-col items-center justify-center ">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full ">
          <h2 className="flex justify-center text-2xl leading-6 font-medium text-gray-900 font-titleH3 mb-3">
            Lege einen neuen Kurs an
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-x-5">
              <div className="mb-4 col-span-2">
                <label
                  htmlFor="title"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Name / Überschrift
                </label>
                <input
                  className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                  {...register("title", {
                    required: "Title is required",
                  })}
                  placeholder="Title"
                />
                {errors.title?.type === "required" && (
                  <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    {errors.title.message}
                  </span>
                )}
              </div>

              <div className="mb-4 col-span-2">
                <label
                  htmlFor="Description"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Beschreibung
                </label>
                <textarea
                  className="textarea w-full px-4 py-2 textarea-border rounded-lg text-gray-700 focus:ring-blue-500 h-36"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  placeholder="Description"
                ></textarea>
                {errors.description?.type === "required" && (
                  <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    {errors.description.message}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="instructor"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Trainer:in
                </label>
                <select
                  className="select select-bordered w-full"
                  {...register("instructor", {
                    required: "Instructor is required",
                  })}
                >
                  <option disabled selected>
                    Trainer:in wählen
                  </option>
                  {instructors.map((instructor) => {
                    return (
                      <option key={instructor.firstName} value={instructor._id}>
                        {instructor.firstName}
                      </option>
                    );
                  })}
                </select>

                {errors.instructor?.type === "required" && (
                  <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    {errors.instructor.message}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="capacity"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  max. Teilnehmer:innen
                </label>
                <input
                  className="input input-bordered w-full max-w-xs"
                  {...register("capacity", {
                    required: "Capacity is required",
                  })}
                  placeholder="Capacity"
                />
                {errors.capacity?.type === "required" && (
                  <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    {errors.capacity.message}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Kursart
                </label>
                <select
                  className="select select-bordered w-full"
                  {...register("type", {
                    required: "Type is required",
                  })}
                >
                  <option disabled selected>
                    wähle aus
                  </option>
                  {activityTypes.map((item) => {
                    return <option key={item._id}>{item.type}</option>;
                  })}
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="startDate"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Startdatum
                </label>
                <Controller
                  control={control}
                  name="startDate"
                  render={({ field }) => (
                    <DatePicker
                      placeholderText="Select date"
                      onChange={(date) => field.onChange(date)}
                      selected={field.value}
                      dateFormat="dd.MM.yyyy HH:mm"
                      className="input input-bordered w-full max-w-xs"
                      showTimeSelect
                      timeFormat="HH:mm"
                    />
                  )}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="endDate"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Enddatum
                </label>
                <Controller
                  control={control}
                  name="endDate"
                  render={({ field }) => (
                    <DatePicker
                      placeholderText="Select date"
                      onChange={(date) => field.onChange(date)}
                      selected={field.value}
                      showTimeSelect
                      timeFormat="HH:mm"
                      dateFormat="dd.MM.yyyy HH:mm"
                      className="input input-bordered w-full max-w-xs"
                    />
                  )}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="repeat"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Wöchentlich{" "}
                </label>
                <input
                  type="checkbox"
                  className="toggle"
                  {...register("repeat", {})}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="repeat"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Wie viele Wochen?
                </label>
                <input
                  className="input input-bordered w-full max-w-xs"
                  {...register("anzahl", {})}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="trialPossible"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Probetraining erlaubt
                </label>
                <input
                  type="checkbox"
                  className="toggle"
                  {...register("trialPossible", {})}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="limitTrialSessions"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Anzahl Probetrainings
                </label>
                <input
                  className="input input-bordered w-full max-w-xs"
                  {...register("limitTrialSessions", {})}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="singlePayPrice"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Einzelpreis
                </label>
                <input
                  className="input input-bordered w-full max-w-xs"
                  {...register("singlePayPrice", {})}
                />
              </div>
            </div>

            {formloading ? (
              <button className=" w-full btn btn-primary text-white px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-2">
                <span className="loading loading-spinner"></span>
                loading
              </button>
            ) : (
              <button
                type="submit"
                className="w-full btn btn-primary text-white px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-2"
              >
                Speichern
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
