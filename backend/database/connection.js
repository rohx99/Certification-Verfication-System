// Establishing the connection between the backend and database

import mongoose from "mongoose";

export const connection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "Certificate_Verification_System",
    })
    .then(() => {
      console.log("Connected to Database");
    })
    .catch(() => {
      console.log(`Error connecting with Database`);
    });
};
