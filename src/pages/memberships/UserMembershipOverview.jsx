import { useNavigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";

//importing icons
import { Arrowleft } from "../../assets/icons/Icons";
import MembershipCard from "../../components/memberships/MembershipCard";
import Stamp from "../../components/memberships/Stamp";

export default function UserMemebershipOverview() {
  const { user } = useContext(AuthContext);
  const activePlans = user?.activeMemberships || [];
  const navigate = useNavigate();
  return (
    <div className="mb-4 flex flex-col items-center">
      {" "}
      <h1 className="text-4xl flex justify-center mb-6 font-titleFont font-bold text-center">
        Deine 10er Karten
      </h1>
      <div className="flex md:flex-row flex-col justify-center items-start">
        {" "}
        <button
          className="btn btn-circle btn-neutral mx-3 mt-2 self-start mb-2"
          onClick={() => navigate(-1)}
        >
          <Arrowleft />
        </button>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col md:flex-row gap-8">
            {activePlans
              .filter((activeplan) => activeplan.membershipStatus === "active") // Filter active memberships only
              .map((activeplan) => (
                <MembershipCard
                  key={activeplan._id}
                  plan={activeplan.membershipPlan}
                  activeplan={activeplan}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
