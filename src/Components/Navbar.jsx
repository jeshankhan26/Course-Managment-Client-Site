import React, { useContext } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import { signOut } from "firebase/auth";
import Swal from "sweetalert2";
import { auth } from "../Provider/firebase.init";

const Navbar = () => {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logout Successful",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.href = "/";
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Logout Failed",
          showConfirmButton: false,
          timer: 1500,
        });
        console.error("Error signing out:", error);
      });
  };
  const { user } = useContext(AuthContext);
 const link = (
  <>
    <li>
      <NavLink to="/" className="lg:text-lg">
        Home
      </NavLink>
    </li>
    <li>
      <NavLink to="/courses" className="lg:text-lg">
        Courses
      </NavLink>
    </li>
    {user && (
      <>
        <li>
          <NavLink to="/add-course" className="lg:text-lg">
            Add Course
          </NavLink>
        </li>
        <li>
          <NavLink to="/my-course" className="lg:text-lg">
            My Course
          </NavLink>
        </li>
        <li>
          <NavLink to="/enrolled-course" className="lg:text-lg">
            Enrolled Course
          </NavLink>
        </li>
      </>
    )}
  </>
);


  return (
    <div className="navbar bg-accent-content shadow-sm lg:px-10">
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-accent-content rounded-box w-52"
          >
            {link}
          </ul>
        </div>

        {/* Logo & Brand */}
        <div className="flex items-center gap-2">
          <img
            src="https://i.ibb.co/nMW3VmXx/2606584-5920-removebg-preview.png"
            className="w-10 h-10"
            alt="logo"
          />
          <motion.h1
            className="text-xl font-bold"
            animate={{
              color: ["#FF5733", "#33FF57", "#3357FF", "#FF33A6", "#FF5733"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
          >
            CourseNest
          </motion.h1>
        </div>
      </div>

      {/* Desktop Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{link}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="User Avatar" src={user.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">{user.displayName}</a>
              </li>
              <li>
                <a>Profile</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          // Auth Buttons
          <div className="flex flex-col lg:flex-row gap-2">
            <NavLink
              to="/login"
              className="btn btn-outline w-full lg:w-auto text-center"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="btn btn-primary w-full lg:w-auto text-center"
            >
              Register
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
