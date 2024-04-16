const asyncHandler = require("express-async-handler");
const { generateToken } = require("../middleware/tokenMiddleware");
const User = require("../models/UserModel");
const ApiError = require("../utils/ApiError");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


exports.login = asyncHandler(async (req, res, next) => {
  // console.log(req.session.get(''));
  // console.log(req.headers.cookie.split("; ")[4].split("=")[1]);
  // console.log(req.headers.cookie.split("; ")[3].split("=")[1]);
  
  try {
  console.log("login route:", req.res);
  
  // if (!req?.session.id) {
  //   return next(new ApiError("Login with Github First", 401, "Login First"));
  // }
  // const accessToken = await generateToken(req.session.user, "14m");
  // const refreshToken = await generateToken(req.session.user, "7d");

  res.status(200).json({
    // accessToken,
    // refreshToken,

    status: "success",
    message:  "login successful",
  });
} catch (error) {
  return next(new ApiError(error.message, 401, "Login First"));
  
}
});


exports.refreshToken = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findByPk(req?.userId);

    if (!user) {
      return next( new ApiError("Login with Github First", 401, "Login First"));
    }

    const accessToken = await generateToken(user, "2m");

    res.status(200).json({
      accessToken,
      status: "success",
      message: "refresh successful",
    });
  } catch (error) {
    return next(new ApiError(error.message, 401, "Login First"));
  }
});