/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "../main";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const Certificates = () => {
  const [students, setStudents] = useState([]);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/v1/user/students",
          { withCredentials: true }
        );
        setStudents(data.students);
      } catch (error) {
        toast.error(error.response.data.error);
      }
    };
    fetchStudents();
  }),
    [];

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-t from-[#111111] to-[#21251f] text-white p-2 font-serif">
        <h1 className="text-center text-2xl sm:text-4xl sm:py-4 py-10 font-bold uppercase text-[#fd7014]">
          All Certificates are listed here
        </h1>
        <h3 className="px-5 py-3 sm:py-8 text-xl uppercase text-blue-400">
          Total Number of Certificates Uploaded -{" "}
          <span className="bg-blue-600 p-2 rounded-full text-white">
            {students.length}
          </span>
        </h3>
        <div className="flex flex-wrap p-5 sm:p-14 gap-10">
          {students && students.length > 0 ? (
            students.map((element) => {
              return (
                <div className="card bg-gradient-to-br rounded-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 text-black from-[#4fd775] to-[#eaff9f] text-xl sm:text-sm sm:p-6 px-20 py-10">
                  <h4>Certificate ID : {element.c_id}</h4>
                  <h4>Name : {element.name}</h4>
                  <h4>Domain : {element.domain}</h4>
                  <h4>Starting Date : {element.s_date}</h4>
                  <h4>Ending Date : {element.e_date}</h4>
                </div>
              );
            })
          ) : (
            <h1 className="text-center text-xl uppercase text-green-600">
              No Student Found
            </h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Certificates;
