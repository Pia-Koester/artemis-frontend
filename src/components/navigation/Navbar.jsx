import { Link, NavLink, useNavigate } from "react-router-dom";
import navLogo from "../../assets/logos/WortBildmarkeMAINLOGO_anthra.svg";
import navLogoSmall from "../../assets/logos/Bildmarke_anthra.svg";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { motion } from "framer-motion";

import { UserIcon } from "../../assets/icons/Icons.jsx";

export default function Navbar() {
  const { isLoading, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <>
      {!isLoading && (
        <div className="navbar bg-base-100 px-2 sm:px-10 py-3">
          <div className="flex-1">
            <NavLink to={"/"}>
              <img
                className="btn btn-lg btn-ghost w-full"
                src={window.innerWidth < 640 ? navLogoSmall : navLogo}
                alt="home"
              />
            </NavLink>
          </div>
          {/* TO DO: animate button to pulse */}
          {user?.role === "student" && (
            <button
              className=" btn-primary btn btn-outline ml-auto mr-10"
              onClick={() => navigate("/angebote")}
            >
              {window.innerWidth < 640
                ? "10er Karte"
                : "Hol dir eine 10er Karte!"}
            </button>
          )}
          {!user ? (
            <>
              <div className="flex-none ">
                <div className="flex-1">
                  <NavLink to={"/signup"} className="btn btn-ghost text-xl">
                    Sign Up
                  </NavLink>
                  <NavLink to={"/login"} className="btn btn-ghost text-xl">
                    Login
                  </NavLink>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-none">
              <div className="flex-1"></div>
              <div className="dropdown dropdown-end z-50">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-lg btn-circle avatar"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="rounded-full"
                  >
                    {user.image?.url ? (
                      <img
                        alt="User Icon - click to see menu options"
                        src={user.image?.url}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      //TO DO: increase size of user icon
                      <UserIcon className="w-5" />
                    )}
                  </motion.div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <>
                    <li className="font-titleFont font-bold ml-3">{`Hello, ${user.firstName}`}</li>
                    <div className="border-t border-cyan-300 mt-1 mb-1"></div>
                  </>
                  {user.role === "student" && (
                    <li>
                      <Link to={"user/gebucht"}>Trainingseinheiten</Link>
                    </li>
                  )}{" "}
                  {user.role === "admin" && (
                    <li>
                      <Link to={"/dashboard "}>Admin Dashboard</Link>
                    </li>
                  )}
                  {user.role === "student" && (
                    <li>
                      <Link to={"user/memberships"}> Karten & Kurse</Link>
                    </li>
                  )}
                  <li>
                    <Link to={"/userProfile/details"}>Account</Link>
                  </li>
                  <li>
                    <Link onClick={logout}>Logout</Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
