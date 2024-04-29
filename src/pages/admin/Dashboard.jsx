import {
  CalendarIcon,
  Tag,
  Instructor,
  CreditCard,
} from "../../assets/icons/Icons";

import UserTableRow from "../../components/admin/UserTableRow";

//TO DO: get all users and display them in the table
//have button for details to show all registered classes and cards

export default function Dashboard() {
  return (
    <div className="mb-4">
      <h1 className="text-4xl flex justify-center mb-6 font-titleFont font-bold text-center">
        Admin Dashboard
      </h1>
      <div className="grid m-4">
        <ul className="menu bg-base-200 w-56 rounded-box">
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
        <div className="stats shadow">
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
            <div className="stat-title">Total Likes</div>
            <div className="stat-value text-primary">25.6K</div>
            <div className="stat-desc">21% more than last month</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Page Views</div>
            <div className="stat-value text-secondary">2.6M</div>
            <div className="stat-desc">21% more than last month</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <div className="avatar online">
                <div className="w-16 rounded-full">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
            </div>
            <div className="stat-value">86%</div>
            <div className="stat-title">Tasks done</div>
            <div className="stat-desc text-secondary">31 tasks remaining</div>
          </div>
          <div
            className="Angemeldete-Nutzer card bg-base-200 shadow-xl flex flex-col p-4 min-w-96 sm:col-start-2  max-h-[550px] overflow-x-auto overflow-y-auto"
            style={{ gridArea: "nutzer" }}
          >
            <div>
              <h3 className="flex justify-center text-2xl leading-6 font-medium text-gray-900 font-titleH3 mb-1">
                Nutzer:innen
              </h3>
              <table className="table p-2 m-2  max-h-[300px] overflow-x-auto overflow-y-auto">
                <tbody>
                  {/* {registeredUsers.map((student) => {
                      console.log(student);
                      return (
                        <UserTableRow
                          student={student}
                          key={student._id}
                          activity={activity}
                        />
                      );
                    })} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
