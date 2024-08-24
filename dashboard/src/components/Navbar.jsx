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
        "http://localhost:3000/api/v1/user/admin/logout",
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
        <div className="links hidden sm:flex sm:flex-row sm:justify-between bg-[#7962f8cb] rounded-xl items-center text-white  hover:bg-[#7862f8] text-sm sm:w-[65%] sm:text-m px-4 py-2 sm:text-lg">
          <Link to={"/"}>Dashboard</Link>
          <Link to={"/addnewadmin"}>Add New Admin</Link>
          <Link to={"/certificates"}>All Certificates</Link>
          <Link to={"/uploadcertificates"}>Upload Certificates</Link>
        </div>
        {isAuthenticated ? (
          <button
            className="border px-4 py-1 rounded-xl text-white sm:hover:scale-110 transform ease-in-out duration-300 sm:hover:bg-[#fd7014]"
            onClick={handleLogout}
          >
            Sign Out
          </button>
        ) : (
          <button
            className="border px-4 py-1 rounded-xl text-white sm:hover:scale-110 transform ease-in-out duration-300 sm:hover:bg-[#fd7014]"
            onClick={goToLogin}
          >
            Sign In
          </button>
        )}
      </nav>
      <div className="sm:hidden h-[7vh] flex flex-row gap-1 bg-[#383454]">
          <Link className="border border-black p-1 text-center flex items-center text-white text-sm rounded-lg bg-[#7862f8]" to={"/"}>Dashboard</Link>
          <Link className="border border-black p-1 text-center flex items-center text-white text-sm rounded-lg bg-[#7862f8]" to={"/addnewadmin"}>Add New Admin</Link>
          <Link className="border border-black p-1 text-center flex items-center text-white text-sm rounded-lg bg-[#7862f8]" to={"/certificates"}>All Certificates</Link>
          <Link className="border border-black p-1 text-center flex items-center text-white text-sm rounded-lg bg-[#7862f8]" to={"/uploadcertificates"}>Upload Certificates</Link>
      </div>
    </>
  );
};

export default Navbar;
