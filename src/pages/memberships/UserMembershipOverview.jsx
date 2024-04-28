import { useNavigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";

//importing icons
import { Arrowleft } from "../../assets/icons/Icons";
import MembershipCard from "../../components/memberships/MembershipCard";
import Stamp from "../../components/memberships/Stamp";

export default function UserMemebershipOverview() {
  const { user } = useContext(AuthContext);
  const activePlans = user?.activeMemberships || [];

  const [activeTab, setActiveTab] = useState("active"); // State to track active tab
  // Function to handle tab click and update active tab state
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const navigate = useNavigate();

  return (
    <div className="mb-4 flex flex-col items-center">
      {" "}
      <h1 className="text-4xl flex justify-center mb-6 font-titleFont font-bold text-center">
        Meine 10er Karten und Kurse
      </h1>
      <div className="flex md:flex-row flex-col justify-center items-start">
        {" "}
        <button
          className="btn btn-circle btn-neutral mx-3 mt-2 self-start mb-2"
          onClick={() => navigate(-1)}
        >
          <Arrowleft />
        </button>
        <div className="flex flex-col gap-2 items-center">
          <div role="tablist" className="tabs tabs-boxed">
            <a
              className={`tab ${activeTab === "active" ? "tab-active" : ""}`}
              onClick={() => handleTabClick("active")}
            >
              Aktive Karten
            </a>
            <a
              role="tab"
              className={`tab ${activeTab === "pending" ? "tab-active" : ""}`}
              onClick={() => handleTabClick("pending")}
            >
              Austehenden Zahlung
            </a>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col md:flex-row gap-8">
              {activePlans.length === 0 && (
                <div>
                  <p>Noch hast du keine 10er Karten gekauft. </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      navigate("/angebote");
                    }}
                  >
                    Angebote
                  </button>
                </div>
              )}
              {activeTab === "active"
                ? activePlans
                    .filter(
                      (activeplan) => activeplan.membershipStatus === "active"
                    )
                    .map((activeplan) => (
                      <MembershipCard
                        key={activeplan._id}
                        plan={activeplan.membershipPlan}
                        activeplan={activeplan}
                      />
                    ))
                : activePlans
                    .filter(
                      (activeplan) =>
                        activeplan.membershipStatus === "payment pending"
                    )
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
    </div>
  );
}
