import { useNavigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";

//importing icons
import { Arrowleft } from "../../assets/icons/Icons";
import MembershipCard from "../../components/memberships/MembershipCard";
import Stamp from "../../components/memberships/Stamp";

export function MembershipOverview() {
  const plans = useLoaderData();
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  console.log("Membership plans", plans);

  return (
    <div className="mb-4 flex flex-col items-center">
      {" "}
      <h1 className="text-4xl flex justify-center mb-6 font-titleFont font-bold text-center">
        Unsere Angebote
      </h1>
      {!user && (
        <button
          className="btn btn-outline m-4 btn-secondary"
          onClick={() => {
            navigate("/signup");
          }}
        >
          {" "}
          Jetzt registrieren
        </button>
      )}
      <div className="flex md:flex-row flex-col justify-center items-start">
        {" "}
        <div className="flex flex-col md:flex-row gap-8">
          {plans.map((plan) => {
            return <MembershipCard key={plan._id} plan={plan} />;
          })}
        </div>
      </div>
    </div>
  );
}
