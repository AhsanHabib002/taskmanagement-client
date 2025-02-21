import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="px-[10px] md:px-[60px] bg-base-100 shadow-sm">
      <div className="navbar ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
            </ul>
          </div>
          <a className="text-xl font-bold">DailyTask</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end gap-3">
          {user ? (
            <>
              <div className="w-10 rounded-full">
                <img
                  className="w-10 rounded-full"
                  alt={user?.displayName}
                  src={user?.photoURL}
                />
              </div>
              <button onClick={logout} className="btn bg-red-500 text-white">
                Log Out
              </button>
            </>
          ) : (
            <NavLink to="/login">
              <button className="btn btn-primary">Login</button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
