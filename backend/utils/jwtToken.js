export const generateToken = (user, message, statusCode, res) => {
  try {
    const token = user.JsonWebToken();

    const cookieName = user.role === "Admin" ? "adminToken" : "studentToken";

    res
      .status(statusCode)
      .cookie(cookieName, token, {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true, // Prevents access to the cookie via JavaScript
      })
      .json({
        success: true,
        message,
        user,
        token,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Token generation failed.",
      error: error.message,
    });
  }
};
