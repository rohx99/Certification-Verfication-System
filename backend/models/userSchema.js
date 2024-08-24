import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

// Creating Schema for User input with certain conditions/validations

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Name must contain atleast 3 characters"],
    maxLength: [50, "Name cannot exceed more than 50 characters"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please provide a valid Email ID"],
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [
      8,
      "Password must contain 8 character including atleast one special character",
    ],
    select: false,
  },
  role: {
    type: String,
    required: true,
    enum: ["Student", "Admin"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ------------------------------------------------------------------


// ------- Using Bcrypt for the password hashing ------------------

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ----------------------------------------------------------------------


// Token generation code using JSON Web Token

userSchema.methods.JsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// ------------------------------------------------------------------------

export const User = mongoose.model("User", userSchema);
