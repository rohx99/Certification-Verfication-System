// Wrap the whole code in the is function to find the error.

export const catchAsyncErrors = (theFunction) => {
  return (req, res, next) => {
    Promise.resolve(theFunction(req, res, next)).catch(next);
  };
};

// ------------------------------------------------------------