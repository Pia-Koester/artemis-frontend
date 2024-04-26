import { addMonths, format } from "date-fns";
import axiosClient from "../../api/axiosClient";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";

export default function MembershipCard({ plan }) {
  //calculate the expiry date based on current date and membership duration
  const currentDate = new Date();
  const expiryDate = addMonths(currentDate, plan.membershipDuration);
  const formattedExpiryDate = format(expiryDate, "yyyy-MM-dd");

  //getting the user from Authcontext
  const { user, setUser } = useContext(AuthContext);
  console.log(user);

  const handleMembershipReservation = async () => {
    console.log(
      "membership reservation",
      plan._id,
      formattedExpiryDate,
      user?._id
    );
    axiosClient
      .post("/usermemberships", {
        membershipPlan: plan._id,
        expiryDate: formattedExpiryDate,
        user: user?._id,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
          <button
            className="btn btn-primary"
            onClick={handleMembershipReservation}
          >
            Jetzt vorbuchen
          </button>
        </div>
      </div>
    </div>
  );
}
