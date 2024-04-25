import { useNavigate, useParams } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { format, differenceInMinutes } from "date-fns";
import { de as deLocale } from "date-fns/locale";

//importing icons
import {
  Arrowleft,
  MapPinIcon,
  ClockIcon,
  CalendarIcon,
  UsersIcon,
} from "../../assets/icons/Icons";

import LocationMap from "../../components/activities/LocationMap";
import ActivityDetails from "../../components/activities/ActivityDetails";

export default function Bookingconfirmation() {
  const { id } = useParams();
  const { user, setUser } = useContext(AuthContext);

  const activity = useLoaderData();

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

  //Accordion functions to allow user to toggle the accordion
  const handleAccordionChange = () => {
    console.log(event.target.id);
  };

  const navigate = useNavigate();

  return (
    <div className="mb-4">
      <h1 className="text-4xl flex justify-center mb-6 font-titleFont font-bold text-center">
        Buchung erfolgreich für: {activity.title}
      </h1>
      <div className="flex md:flex-row flex-col justify-center items-start my-4 sm:mx-32 mx-4">
        {" "}
        <button
          className="btn btn-circle btn-neutral mr-3 mt-2 self-start"
          onClick={() => navigate("/")}
        >
          <Arrowleft />{" "}
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 self-start min-h-0 ">
          <div className="card bg-white shadow-xl p-4 ">
            <ActivityDetails
              activity={activity}
              id={id}
              formattedStartTime={formattedStartTime}
              formattedEndTime={formattedEndTime}
              formattedStartDate={formattedStartDate}
              duration={duration}
              confirmation={true}
            />
            <div className="flex gap-2 m-4 sm:justify-center items-center flex-col sm:flex-row">
              <button className="btn btn-primary">alle meine Buchungen</button>
              <button className="btn btn-primary">Meine 10er Karte</button>
              <button className="btn btn-secondary">Buchung entfernen</button>
            </div>
          </div>
          <div className="Kursort card bg-white shadow-xl flex flex-col p-4 min-h-96">
            <div className="flex gap-2 m-2">
              <MapPinIcon className="w-7" />
              <p className="font-bold">Wo muss ich hinkommen?</p>
            </div>
            <LocationMap
              className="w-4/5 self-center"
              location={activity.location}
            />
            <p>Adresse: {activity.location.address}</p>
            <p>Klingel bei: Artemis Academy</p>
          </div>
          <div className="card bg-white shadow-xl flex flex-col p-4 sm:col-span-2 col-span-1 ">
            <div id="accordion">
              <div className="collapse collapse-arrow bg-base-200 m-2">
                <input
                  type="radio"
                  name="accordion"
                  id="accordion1"
                  onChange={handleAccordionChange}
                />
                <div className="collapse-title text-xl font-medium">
                  <label for="accordion1">Was muss ich mitbringen?</label>
                </div>
                <div className="collapse-content m-4">
                  <p>
                    Du brauchst nichts mitzubringen, außer lockerer
                    Trainingskleidung (am besten ohne Reißverschlüsse oder
                    Knöpfe) und etwas zu trinken. Du brauchst keine Sportschuhe
                    - wir trainieren barfuß auf Kampfsportmatten.
                  </p>
                </div>
              </div>
              <div className="collapse collapse-arrow bg-base-200 m-2">
                <input
                  type="radio"
                  name="accordion"
                  id="accordion2"
                  onChange={handleAccordionChange}
                />
                <div className="collapse-title text-xl font-medium">
                  <label for="accordion2">Wann darf ich kommen?</label>
                </div>
                <div className="collapse-content m-4">
                  <p>
                    Du kannst immer - unabhängig von der Terminart - 10 bis
                    maximal 15 Minuten vor Beginn des Termins / der
                    Veranstaltung in die Räumlichkeiten kommen. Um den Ablauf
                    nicht zu stören, bitten wir dich, so zu kommen, dass wir um{" "}
                    {activity.startTime} mit dem Training beginnen können.
                  </p>
                </div>
              </div>
              <div className="collapse collapse-arrow bg-base-200 m-2">
                <input
                  type="radio"
                  name="accordion"
                  id="accordion3"
                  onChange={handleAccordionChange}
                />
                <div className="collapse-title text-xl font-medium">
                  <label for="accordion3">
                    Was sollte ich sonst noch beachten?
                  </label>
                </div>
                <div className="collapse-content m-4">
                  <ul className="list-disc">
                    <li>
                      Bitte komm mit relativ kurz geschnittenen Finger- und
                      Fußnägeln. Es wird einige Übungen geben, bei denen ihr
                      euch oder andere mit langen Nägeln verletzen könntet.
                    </li>
                    <li>
                      Lege all deinen Schmuck vor dem Training ab. Wenn du
                      Schmuck trägst, den du nicht abnehmen kannst, sorge dafür,
                      dass du und deine Trainingspartnerinnen verletzungsfrei
                      bleiben (z.B. durch Abkleben o.ä.)
                    </li>
                    <li>
                      Wenn du merkst, dass das Training dich emotional belastet,
                      sprich uns bitte direkt an. Du hast jederzeit während des
                      Trainings die Möglichkeit, dir Pausen zu nehmen.{" "}
                    </li>
                    <li>
                      Bitte komm nur dann zum Training, wenn du dich körperlich
                      komplett gesund fühlst. Bleibe bitte auch mit Erkältung
                      oder ähnlichem zu Hause, auch wenn die Symptome nur „ganz
                      leicht“ sind. Ich behalte es mir vor, Teilnehmerinnen
                      wieder nach Hause zu schicken, wenn Symptome einer
                      Erkältung oder ähnlichem vorhanden sind.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
