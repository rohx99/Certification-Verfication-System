/* eslint-disable no-unused-vars */
import React from "react";

const Description = () => {
  return (
    <div className="h-[60vh] w-full px-7 sm:px-20 py-7 flex flex-col gap-2 text-[#eeeeee]">
      <h1 className="text-2xl text-red-500 font-extrabold animate-bounce">Must Read Me ...</h1>
      <p>
        This is a demo project to showcase how a student can register & login to
        this portal and download his certificate using the unique certificate ID
        given by his institution.
      </p>
      <p>
        Student can register themselves to this portal or can use this sample
        Email ID & Password to login
      </p>
      <p>
        Email ID : student@sample.com <br /> Password : student123
      </p>
      <p>There is an admin portal available on port ` http://localhost:5174`</p>
      <p>You can use this following credentials to login as Admin </p>
      <p>
        Admin Email ID : admin@sample.com <br /> Admin Password : admin123
      </p>
      <p>
        Admin have the access to upload the certificates of the students via
        Excel File
      </p>
    </div>
  );
};

export default Description;
