/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AddNewAdmin = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleAdminRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/admin/addnew",
        { name, email, phone, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigateTo("/");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <div className="flex items-center justify-center flex-col h-[76vh] sm:h-[84vh] w-full px-2 py-20 sm:py-10 bg-gradient-to-t from-[#111111] to-[#21251f]">
        <h2 className="sm:pb-10 pb-6 text-4xl text-[#fd7014] font-extrabold font-serif text-center uppercase">
          New Admin Register
        </h2>
        <div className="h-[100%] w-[60%] flex items-center justify-center px-10 py-5">
          <form
            className="flex flex-col h-[100%] sm:w-[80%] gap-7"
            onSubmit={handleAdminRegister}
          >
            <input
              className="px-10 py-3 sm:p-3 rounded-3xl text-black text-center"
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your Full Name"
            />
            <input
              className="px-10 py-3 sm:p-3 rounded-3xl text-black text-center"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
            />
            <input
              className="px-10 py-3 sm:p-3 rounded-3xl text-black text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your Mobile Number"
            />
            <input
              className="px-10 py-3 sm:p-3 rounded-3xl text-black text-center"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a Password"
            />
            <button
              className="text-white text-xl bg-gradient-to-r from-[#feb47b] to-[#ff7e5f] p-5 rounded-3xl"
              type="submit"
            >
              Click to Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNewAdmin;
