const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const ApiError = require("../utils/ApiError");

exports.generateToken = async (githubId, duration, secret) => {
  
  // console.log(user);
    const Token = jwt.sign(
      {
        id: githubId,
      },
      secret,
      { expiresIn: duration }
    );
    return Token;

};

exports.verifyAccessToken = async function (req, res, next) {
  const accessToken = req?.headers?.authorization?.split(" ")[1];
  try {
    if (!accessToken) {
      return next(
        new ApiError(
          "No access token provided",
          403,
          "No access token provided"
        )
      );
    }
    
    console.log('access token is:',accessToken);
    const verify = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    
    if (!verify) {
      return next(new ApiError('Invalid access token, unauthorized', 401, 'Invalid access token'));
    }
    
    const decoded = jwt.decode(accessToken, process.env.ACCESS_TOKEN_SECRET);
    

    const exitUser = await User.findOne({where: {githubId: decoded.id}})

    if (!exitUser) {
      return next(new ApiError("Invalid Token, user not found", 401, "Invalid Token"));
    }
    
    req.userId = exitUser.githubId;
    next();
  } catch (error) {
    return next(new ApiError("Invalid Token, unauthorized", 401, "Invalid Token"));
  }
};

exports.verifyRefreshToken = async function (req, res, next) {
  const {refresh} = req?.body;
  try {
    if (!refresh) {
      return next(
        new ApiError(
          "No access token provided",
          403,
          "No access token provided"
        )
      );
    }
    
    const verify = jwt.verify(refresh, process.env.REFRESH_TOKEN_SECRET);
    
    console.log('refresh token is:',refresh);
    if (!verify) {
      return next(new ApiError('Invalid access token, unauthorized', 401, 'Invalid access token'));
    }
    
    const decoded = jwt.decode(refresh, process.env.REFRESH_TOKEN_SECRET);
    

    const exitUser = await User.findOne({where: {githubId: decoded.id}})

    console.log(decoded.id);
    if (!exitUser) {
      return next(new ApiError("Invalid Token, user not found", 401, "Invalid Token"));
    }
    
    req.userId = exitUser.githubId;
    next();
  } catch (error) {
    return next(new ApiError("Invalid Token, unauthorized", 401, "Invalid Token"));
  }
};

