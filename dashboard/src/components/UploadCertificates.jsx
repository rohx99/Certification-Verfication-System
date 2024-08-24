/* eslint-disable no-unused-vars */
// frontend/src/components/Upload.jsx
import React, { useState, useContext } from "react";
import axios from "axios";
import { Context } from "../main";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const Upload = () => {
  const { isAuthenticated } = useContext(Context);

  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:3000/api/v1/upload", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("File uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error.response || error.message);
      toast.error(error.response?.data?.message || "Error uploading file");
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="sm:h-[84vh] h-[76vh] w-full bg-gradient-to-t from-[#111111] to-[#21251f] font-serif text-white flex items-center justify-center flex-col">
      <h2 className="sm:text-3xl text-2xl p-10 uppercase font-bold text-[#fd7014]">
        Upload Excel File To Parse the certificates into database
      </h2>
      <p className="text-red-600 px-10 sm:px-0 mb-5">
        NOTE : The excel file should be in following order -<br />
        c_id : Unique Certificate ID , name : Student Name , domain : Internship
        Domain ,<br /> s_date : Internship Start Date , e_date : Internship End
        Date
      </p>
      <table className="border border-white text-[#dddddd]">
  <thead>
    <tr>
      <th className="border border-white text-[#dddddd]">c_id</th>
      <th className="border border-white text-[#dddddd]">name</th>
      <th className="border border-white text-[#dddddd]">domain</th>
      <th className="border border-white text-[#dddddd]">s_date</th>
      <th className="border border-white text-[#dddddd]">e_date</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="border border-white text-[#dddddd]">001</td>
      <td className="border border-white text-[#dddddd]">Sameer</td>
      <td className="border border-white text-[#dddddd]">C#</td>
      <td className="border border-white text-[#dddddd]">10th Jan 2020</td>
      <td className="border border-white text-[#dddddd]">10th Feb 2020</td>
    </tr>
    <tr>
    <td className="border border-white text-[#dddddd]">002</td>
      <td className="border border-white text-[#dddddd]">Rohan</td>
      <td className="border border-white text-[#dddddd]">C++</td>
      <td className="border border-white text-[#dddddd]">27th Mar 2023</td>
      <td className="border border-white text-[#dddddd]">29th July 2024</td>
    </tr>
  </tbody>
</table>
      <input
        className="border-2 rounded-full p-2 text-[#fd7014] mt-5"
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button
        className="bg-[#fd7014] m-10 px-8 py-2 rounded-2xl font-bold"
        onClick={handleUpload}
      >
        Upload
      </button>
    </div>
  );
};

export default Upload;
