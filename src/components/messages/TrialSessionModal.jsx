import RegistrationForm from "../user/RegistrationForm";

export default function TrialSessionModal({ activity, id }) {
  return (
    <dialog id="trialSession" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h2 className="text-2xl">
          Erstelle einen Account für das Probetraining
        </h2>
        <RegistrationForm trial activity={activity} id={id} />
      </div>
    </dialog>
  );
}
