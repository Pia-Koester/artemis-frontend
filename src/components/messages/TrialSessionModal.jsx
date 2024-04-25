import RegistrationForm from "../user/RegistrationForm";

export default function TrialSessionModal({ activity, id }) {
  return (
    <dialog id="trialSession" className="modal">
      <div className="modal-box">
        <h2 className="text-2xl">
          Erstelle einen Account für das Probetraining
        </h2>
        <RegistrationForm trial activity={activity} id={id} />
      </div>
    </dialog>
  );
}
