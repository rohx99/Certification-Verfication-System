/* eslint-disable no-unused-vars */

import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/student/register",
        { name, email, phone, password, role : "Student" },
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

  if (isAuthenticated) {
    return <Navigate to={"/"} />
  }
  return (
    <div className="flex items-center justify-center flex-col h-[90vh] w-[90vw] px-2 py-10 border rounded-full bg-[#30353c]">
      <h2 className="pb-10 text-3xl text-[#c8f560] font-serif text-center uppercase"><span className="text-red-500">New ? </span><br /> Register & Download your certificate</h2>
      <div className="h-[100%] w-[60%] flex items-center justify-center px-10 py-5">
      <form className="flex flex-col h-[100%] sm:w-[80%] gap-7" onSubmit={handleRegister}>
        <input
          className="p-3 rounded-3xl text-black text-center"
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your Full Name"
        />
        <input
          className="p-3 rounded-3xl text-black text-center"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email ID"
        />
        <input
          className="p-3 rounded-3xl text-black text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
          type="number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your Mobile Number"
        />
        <input
          className="p-3 rounded-3xl text-black text-center"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a Password"
        />
        <button className="text-white text-xl bg-gradient-to-r from-[#d4e157] to-[#388e3c] p-5 rounded-3xl" type="submit">
          Click to Register
        </button>
      </form>
      </div>
    </div>
  );
};

export default Register;
