/* eslint-disable no-unused-vars */
import React from "react";
import Description from "./Description";

const Dashboard = () => {
  return (
    <div className="h-[76vh] sm:h-[84vh] w-full bg-gradient-to-t from-[#111111] to-[#21251f] flex flex-col p-10 justify-center">
      <div className="text-4xl flex items-center h-[40%] sm:text-7xl text-[#fd7014] uppercase font-serif font-bold">
        Welcome to <br /> my Admin Dashboard
      </div>
      <Description />
    </div>
  );
};

export default Dashboard;
