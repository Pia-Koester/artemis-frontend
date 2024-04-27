export default function UserMembershipModal({
  plan,
  handleMembershipReservation,
  formattedExpiryDate,
}) {
  return (
    <dialog id="membershipBooking" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h2 className="text-2xl mb-4">Besorge dir deine {plan.title}</h2>
        <p>
          Mit klick auf bestellen wird deine Buchung durchgeführt. Die Zahlung
          erfolgt vor Ort in Bar oder mit Karte.{" "}
        </p>
        <p>
          Auch wenn du noch nicht gezahlt hast kannst du schon einen ersten Kurs
          buchen.
        </p>
        <button
          className="btn btn-primary my-4"
          onClick={handleMembershipReservation}
        >
          Buchen
        </button>
      </div>
    </dialog>
  );
}
