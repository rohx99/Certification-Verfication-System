import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";


//--------------- Helper function to verify token and role ----------------------------

const verifyTokenAndRole = async (req, res, next, token, expectedRole) => {
  if (!token) {
    return next(new ErrorHandler(`${expectedRole} not authenticated`, 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findById(decoded.id);

  if (!user || user.role !== expectedRole) {
    return next(
      new ErrorHandler(
        `${
          user ? user.role : "User"
        } is not authorized to access this resource`,
        403
      )
    );
  }

  req.user = user; // Attach the user to the request object
  next();
};

// -------------------------------------------------------------------------------------


// -------------- Middleware for Admin Authentication ----------------------------

export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.adminToken;
  await verifyTokenAndRole(req, res, next, token, "Admin");
});

// -----------------------------------------------------------------------------------


// --------------- Middleware for Student Authentication ------------------------------

export const isStudentAuthenticated = catchAsyncErrors(
  async (req, res, next) => {
    const token = req.cookies.studentToken;
    await verifyTokenAndRole(req, res, next, token, "Student");
  }
);

// -----------------------------------------------------------------------------------------