//importing icons
import {
  Arrowleft,
  MapPinIcon,
  ClockIcon,
  CalendarIcon,
  UsersIcon,
} from "../../assets/icons/Icons";

export default function Modal({
  activity,
  id,
  formattedEndTime,
  formattedStartTime,
  formattedStartDate,
}) {
  return (
    <>
      <dialog id="badCredentials" className="modal">
        <div className="modal-box">
          <div role="alert">
            <h3 className="font-bold text-lg">Oh nein!</h3>
            <p className="py-4">
              Benutzername und Passwort stimmen nicht überein - probiere es noch
              einmal.
            </p>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Nochmal probieren</button>
        </form>
      </dialog>

      <dialog id="bookingInfo" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Kursdetails für {activity.title}
          </h3>
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
            {formattedStartTime} - {formattedEndTime}
          </p>
        </div>
        {/* TO DO: check if user is logged in or not, if not then show Probetraining buchen, if yes, then check if membership or not */}
        <form method="dialog" className="modal-backdrop">
          <button>schließen</button>
        </form>
      </dialog>
    </>
  );
}
