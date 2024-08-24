/* eslint-disable no-unused-vars */

import React from "react";

const Hero = () => {
  return (
    <div className="flex sm:h-[50vh] h-[60vh] w-full text-[#c8f560] flex-col sm:flex-row">
      <div className="flex items-center justify-center py-6 sm:w-[70%] sm:py-0">
        <h1 className="uppercase font-serif font-extrabold text-4xl sm:text-5xl tracking-widest sm:tracking-wide sm:font-bold p-4">
          Welcome to <br /> Certificate <br />
          verification system
        </h1>
      </div>
      <div className="flex sm:h-[100%] items-center justify-center sm:w-[30%] px-8 py-16">
        <img
          className="h-[100%] w-[100%] object-cover rounded-md bg-red-300"
          src="https://images.pexels.com/photos/2293019/pexels-photo-2293019.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="certificate_image"
        />
      </div>
    </div>
  );
};

export default Hero;
