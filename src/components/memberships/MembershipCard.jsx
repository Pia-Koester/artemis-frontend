export default function MembershipCard({ plan }) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={plan.image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{plan.title}</h2>
        <p>{plan.description}</p>
        <p>Kosten: {plan.price}</p>
        <p>Anzahl Teilnahmen: {plan.availableCredits}</p>
        <p>Gültig für {plan.membershipDuration} Monate</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Jetzt vorbuchen</button>
        </div>
      </div>
    </div>
  );
}
