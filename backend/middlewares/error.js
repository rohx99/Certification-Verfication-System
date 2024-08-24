// ErrorHandler class is already present in the JavaScript, we use this ErrorHandler Middleware to find & show the error to the user without the "Server Down" problem.

class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Defining the types of Error we can face during the registration process

export const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  if (err.name === "CasteError") {
    // Caste error for qualifying the set conditions in UserSchema
    const message = `Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered.`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "JsonWebTokenError") {
    const message = `Invalid JSON Web Token, Try Again`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "TokenExpiredError") {
    const message = `JSON Web Token is expired, Try Again`;
    err = new ErrorHandler(message, 400);
  }

  // This below code shows only the Error we have defined in the UserSchema

  const errorMessage = err.errors
    ? Object.values(err.errors)
        .map((error) => error.message)
        .join(" & ")
    : err.message;

  // --------------End -----------------

  return res.status(err.statusCode).json({
    success: false,
    message: errorMessage,
  });
};

export default ErrorHandler;
