/* eslint-disable no-unused-vars */

import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        { email, password, role: "Student" },
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
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex items-center justify-center flex-col h-[83vh] sm:h-[84vh] w-full px-2 py-10 bg-gradient-to-t from-[#111111] to-[#21251f]">
      <h2 className="sm:pb-10 text-4xl text-[#c8f560] font-bold font-serif text-center uppercase">Student Log In</h2>
      <div className="h-[70%] w-[60%] flex items-center justify-center px-10 py-5">
      <form className="flex flex-col justify-center h-[100%] sm:w-[80%] gap-7" onSubmit={handleLogin}>
        <input className="sm:p-3 px-10 py-3 rounded-3xl text-black text-center"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="student@sample.com"
        />
        <input className="sm:p-3 px-10 py-3 rounded-3xl text-black text-center"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="student123"
        />
        <button className="text-white font-bold text-xl bg-gradient-to-r from-[#d4e157] to-[#388e3c] p-5 rounded-3xl" type="submit">Log In</button>
      </form>
      </div>
    </div>
  );
};

export default Login;
