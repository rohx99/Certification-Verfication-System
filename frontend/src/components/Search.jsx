// frontend/src/components/Search.jsx
import { useContext, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const Search = () => {
  const [inputID, setInputID] = useState(""); // Input value for search
  const { isAuthenticated } = useContext(Context);

  const handleSearch = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/certificates/search/${inputID}`,
        { withCredentials: true }
      );

      // Open a new tab and display the certificate details
      const newTab = window.open("", "_blank");
      newTab.document.write(`
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificate</title>
</head>

<body>
    <style>
        .main-outline {
            height: 97vh;
            width: 97vw;
            border: 2px solid black;
            position: relative;
            display: flex;
            background: linear-gradient(to bottom right, #83a4d4, #b6fbff);
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }

        .description {
            padding: 0 25vw;
            margin-bottom: 15px;
        }

        .sign {
            border: 2px solid black;
            padding: 15px;
        }

        .highlight {
            color: red;
            font-weight: bold;
        }

        button {
            color: #090909;
            padding: 0.7em 1.7em;
            font-size: 18px;
            border-radius: 0.5em;
            background: #e8e8e8;
            cursor: pointer;
            border: 1px solid #e8e8e8;
            transition: all 0.3s;
            box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;
        }
    </style>

    <div class="main-outline">
        <h3 class="heading-1">Company Name</h3>
        <h1>Certificate of Internship</h1>
        <hr>
        <h2>${data.name}</h2>
        <p class="description">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro magni corrupti a placeat
            animi eaque ab, ex velit facere commodi ea libero saepe <span class="highlight">Domain :
                ${data.domain}</span> quisquam temporibus quod suscipit excepturi? Nostrum, nemo voluptatem pariatur
            nesciunt enim, maxime odio nulla error sint tenetur reprehenderit? Veniam id dolores error. <br> <br> Lorem
            ipsum dolor sit amet <span class="highlight">Starting Date: ${data.s_date}</span>consectetur adipisicing
            elit. Incidunt at iste harum saepe <span class="highlight">Ending Date: ${data.e_date}</span> dicta
            perferendis dolores nihil maiores minus? Ullam quis perferendis libero aspernatur deserunt iure tenetur? In,
            quasi? Eum?</p>
        <h2 class="sign">Signature Image</h2>
        <h4>CEO Name</h4>
        <h3>Certificate ID : ${data.c_id}</h3>
    </div>
    <button onclick="window.print()">Download</button>
</body>

</html>
      `);
      newTab.document.close();
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="flex flex-col items-center justify-center text-[#c8f560] font-bold h-[83vh] sm:h-[84vh] w-full bg-gradient-to-t from-[#111111] to-[#21251f]">
      <h2 className="text-4xl uppercase p-20">
        Please Enter your unique Certificate ID
      </h2>
      <input
        className="p-3 rounded-3xl text-black text-center sm:mb-20 mb-10"
        type="text"
        placeholder="Enter your Certificate ID"
        value={inputID}
        onChange={(e) => setInputID(e.target.value)}
      />
      <button
        className="text-white text-xl bg-gradient-to-r from-[#d4e157] to-[#388e3c] px-10 py-2 rounded-3xl"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
