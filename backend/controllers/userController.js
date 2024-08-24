// used for handling user input, directing the flow of application, ensures right data displays in the right format

import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import Record from "../models/recordSchema.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";


// Below code is used to register the Student with some conditions & validations

export const studentRegister = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !phone || !password || !role) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    let user = await User.findOne({ email });
    if (user) {
      return next(new ErrorHandler("Email is already registered", 400));
    }

    user = await User.create({
      name,
      email,
      phone,
      password,
      role,
    });

    // Generating Token with JWT
    generateToken(user, "User Registered", 200, res);
  } catch (error) {
    next(error);
  }
});

// ------------------------------------------------------------------------------------------------


// The below code is used for Login the candidate with the registered credentials

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide all the details", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invaild email or password", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invaild email or password", 400));
  }
  if (role !== user.role) {
    return next(new ErrorHandler("User with this role not found", 400));
  }
  generateToken(user, `Welcome, ${user.role} ${user.name}`, 200, res);
});

// ----------------------------------------------------------------------------------------


// The below code is used to create a new ADMIN

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    let user = await User.findOne({ email });
    if (user) {
      return next(
        new ErrorHandler(
          `Email of this ${user.role} is already registered`,
          400
        )
      );
    }

    const Admin = await User.create({
      name,
      email,
      phone,
      password,
      role: "Admin",
    });

    // Generating Token with JWT
    generateToken(Admin, "A new Admin Registered", 200, res);
  } catch (error) {
    next(error);
  }
});

// -----------------------------------------------------------------------------------------


// ---------- Get all students name whose certificates are uploaded  ------------------------

export const getAllStudents = catchAsyncErrors(async (req, res, next) => {
  const students = await Record.find();
  res.status(200).json({
    success: true,
    students,
  });
});

// ------------------------------------------------------------------------------------------


// ---------------------- Logout function for Admin ----------------------------------------

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin log out successfully",
    });
});

// ------------------------------------------------------------------------------------------------


// ---------------------- Logout function for Student ----------------------------------------

export const logoutStudent = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("studentToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: `Student log out successfully`,
    });
});

// ---------------------------------------------------------------------------------------------





// export const addNewFile = catchAsyncErrors(async(req, res, next) =>{
//   if(!req.files || Object.keys(req.files).length === 0){
//     return next (new  ErrorHandler("Please upload a file to parse"), 400);
//   }
//   const {excelFile} = req.files;
//   const allowFormats = ["/file/xlsx" , "/file/xls"];
//   if(!allowFormats.includes(excelFile.mimetype)){
//       return next (new ErrorHandler("File format not supported", 400))
//   }
// })
