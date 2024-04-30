import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { getNumberOfTrialSessions } from "../../api/activities";

import {
  CalendarIcon,
  Tag,
  Instructor,
  CreditCard,
  EuroIcon,
} from "../../assets/icons/Icons";

import TableRowDahboard from "../../components/admin/TableRowDashboard";

//TO DO: get all users and display them in the table
//have button for details to show all registered classes and cards

export default function Dashboard() {
  // Responsive Grid Layout
  const gridTemplateColumns = "1fr 1fr 1fr 1fr";
  const gridTemplateRows = "1fr 1fr 1fr 1fr";

  const gridTemplateAreas = `
  "aktionen stats stats stats"
  "nutzer nutzer nutzer nutzer"
  "nutzer nutzer nutzer nutzer"
  "nutzer nutzer nutzer nutzer"
`;

  const navigate = useNavigate();
  const users = useLoaderData();

  //Fetch the number of trial sessions and set the state
  const [trialSessions, setTrialSessions] = useState(null);
  const [membershipsCount, setMembershipsCount] = useState(null);
  const [pendingMembershipsCount, setPendingMembershipsCount] = useState(null);
  const [updateMembershipPayment, setUpdateMembershipPayment] = useState(false);
  const [usersWithPendingPayments, setUsersWithPendingPayments] = useState([]);

  useEffect(() => {
    getNumberOfTrialSessions(0).then((data) => {
      setTrialSessions(data);
    });
    // Count users with active memberships
    const count = countUsersWithActiveMemberships(users);
    setMembershipsCount(count);
    const pendingCount = countUsersWithPendingMemberships(users);
    setPendingMembershipsCount(pendingCount.totalPending);
    setUsersWithPendingPayments(pendingCount.usersWithPendingPayments);
  }, [updateMembershipPayment]);

  //TO DO: calculate the amount of active 10er cards in totla
  const countUsersWithActiveMemberships = (users) => {
    // Filter users with non-empty activeMemberships arrays
    let totalActive = 0;

    users.forEach((user) => {
      if (user.activeMemberships && user.activeMemberships.length > 0) {
        user.activeMemberships.forEach((membership) => {
          if (membership.membershipStatus === "active") {
            totalActive++;
          }
        });
      }
    });

    return totalActive;
  };

  const countUsersWithPendingMemberships = (users) => {
    // Filter users with non-empty activeMemberships arrays
    let totalPending = 0;
    let usersWithPendingPayments = [];
    let hasPendingPayment = false;

    users.forEach((user) => {
      let hasPendingPayment = false;
      user.activeMemberships.forEach((membership) => {
        if (membership.membershipStatus === "payment pending") {
          totalPending++;
          hasPendingPayment = true;
        }
      });
      if (hasPendingPayment) {
        usersWithPendingPayments.push(user);
      }
    });

    //TO DO: figure out how to show the individual membership with the corresponding payment status

    return { totalPending, usersWithPendingPayments };
  };
  //TO DO: calculate the amount of unpaid 10er cards

  return (
    <div className="mb-4 flex flex-col items-center">
      <h1 className="text-4xl flex justify-center mb-6 font-titleFont font-bold text-center">
        Admin Dashboard
      </h1>{" "}
      <button
        className="btn btn-sm btn-primary"
        onClick={() => setUpdateMembershipPayment(false)}
      >
        Alle Nutzer:innen anzeigen
      </button>
      <div
        className="grid m-10 h-auto w-3/4 justify-items-strech items-start gap-2"
        style={{ gridTemplateColumns, gridTemplateRows, gridTemplateAreas }}
      >
        {" "}
        <div style={{ gridArea: "aktionen" }}>
          <ul className="menu bg-base-200 rounded-box ">
            <li>
              <a href="/admin/createactivity">
                <CalendarIcon />
                Neue Trainingseinheit
              </a>
            </li>
            <li>
              <a>
                <CreditCard />
                Neue Kurse und Karten
              </a>
            </li>
            <li>
              <a href="/admin/createtype">
                <Tag />
                Neue Kursart
              </a>
            </li>
            <li>
              <a href="/admin/createinstructor">
                <Instructor />
                Neue Trainer:in
              </a>
            </li>
          </ul>
        </div>
        <div style={{ gridArea: "stats" }}>
          <div className="stats shadow flex">
            <div className="stat">
              <div className="stat-figure text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Probetrainings</div>
              {!trialSessions ? (
                <div className="stat-value">Loading...</div>
              ) : (
                <div className="stat-value text-primary">{trialSessions}</div>
              )}

              <div className="stat-desc">diese Woche</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <CreditCard />
              </div>
              <div className="stat-title">10er Karten und Kurse</div>
              <div className="stat-value text-secondary">
                {membershipsCount}
              </div>
              <div className="stat-desc">aktiv</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-base">
                <EuroIcon />
              </div>
              <div className="stat-value">{pendingMembershipsCount}</div>
              <div className="stat-title">unbezahlte 10er Karten</div>
              <div className="stat-actions">
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => setUpdateMembershipPayment(true)}
                >
                  Verwalten
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* place here */}
        <div
          className="Angemeldete-Nutzer card bg-base-200 shadow-xl flex flex-col p-4 min-w-96  max-h-[550px] overflow-x-auto overflow-y-auto "
          style={{ gridArea: "nutzer" }}
        >
          <div>
            <h3 className="flex justify-center text-2xl leading-6 font-medium text-gray-900 font-titleH3 mb-1">
              Nutzer:innen
            </h3>
            <table className="table p-2 m-2  max-h-[300px]">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>E-Mail</th>
                  <th>Adresse</th>
                  <th>Geburtsdatum </th>
                  <th>Angemeldet seit</th>
                  <th>Karten & Kurse</th>
                </tr>
              </thead>
              <tbody className=" max-h-[550px] overflow-x-auto overflow-y-auto">
                {updateMembershipPayment
                  ? usersWithPendingPayments?.map((student) => (
                      <TableRowDahboard
                        key={student.id}
                        student={student}
                        pending={pendingMembershipsCount}
                      />
                    ))
                  : users.map((student) => (
                      <TableRowDahboard key={student.id} student={student} />
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
