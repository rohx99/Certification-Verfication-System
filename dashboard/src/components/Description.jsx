/* eslint-disable no-unused-vars */
import React from "react";

const Description = () => {
  return (
    <div className="h-[60%] w-full px-2 sm:px-20 py-7 flex flex-col gap-5 sm:gap-2 text-[#eeeeee] sm:text-xl">
      <h1 className="text-2xl text-red-500 font-extrabold animate-bounce">Must Read Me ...</h1>
      <p>
        This is a demo project to showcase how a admin can login to this portal
        and upload the certificates of students.
      </p>
      <p>Please use the below credentials to test the Admin Panel</p>
      <p>
        Email ID : admin@sample.com <br /> Password : admin123
      </p>
      <p>
        There is an student portal available on port ` http://localhost:5173`
      </p>
    </div>
  );
};

export default Description;
