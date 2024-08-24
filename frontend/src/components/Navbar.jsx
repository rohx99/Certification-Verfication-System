/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const toNavigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/user/student/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      setIsAuthenticated(false);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const goToLogin = () => {
    toNavigate("/login");
  };

  return (
    <>
      <nav className="navbar w-full bg-gradient-to-t from-[#21251f] to-[#111111] text-white font-bold flex justify-between items-center py-3 px-4 sm:px-10 sm:p-2 sm:h-[10vh] sm:text-lg">
        <div>LOGO</div>
        <div className="links flex flex-wrap justify-between bg-[#7962f8cb] rounded-xl items-center text-white  hover:bg-[#7862f8] text-sm w-[55%] sm:text-m px-4 py-2 sm:w-[30%] sm:text-lg">
          <Link to={"/"}>Home</Link>
          <Link to={"/search"}>Search Certificate</Link>
        </div>
        {isAuthenticated ? (
          <button
            className="border px-4 py-1 rounded-xl text-white sm:hover:scale-110 transform ease-in-out duration-300 sm:hover:bg-[#64A543]"
            onClick={handleLogout}
          >
            Log Out
          </button>
        ) : (
          <button
            className="border px-4 py-1 rounded-xl text-white sm:hover:scale-110 transform ease-in-out duration-300 sm:hover:bg-[#64A543]"
            onClick={goToLogin}
          >
            Log In
          </button>
        )}
      </nav>
    </>
  );
};

export default Navbar;
