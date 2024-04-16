const router = require("express").Router();
const passport = require("passport");
const { generateToken, verifyRefreshToken } = require("../middleware/tokenMiddleware");
const ApiError = require("../utils/ApiError");



router.post('/refresh', verifyRefreshToken, async (req, res, next) => {
  const { refresh } = req.body;
  console.log(refresh);
  if (!refresh) {
    return next(new ApiError("No refresh token provided", 401, "No refresh token provided"));
  }
  
  const accessToken = await generateToken(req.userId, '14m', process.env.ACCESS_TOKEN_SECRET);
  res.status(200).json({
    accessToken,
    status: "success",
    message: "token refreshed",
  })
})

router.get(
  "/github",
  passport.authenticate("auth-github", {
    scope: ["user:email"],
    session: false,
  })
);

router.get(
  "/github/callback",
  passport.authenticate("auth-github", {
    scope: ["user:email"],
    session: false,
  }),
  async function (req, res) {

    console.log(req.user[0]);
    const accessToken = await generateToken(req?.user[0].githubId, '14m', process.env.ACCESS_TOKEN_SECRET);
    const refreshToken = await generateToken(req?.user[0].githubId, '7d', process.env.REFRESH_TOKEN_SECRET);
    
    req.user = { ...req?.user, refreshToken, accessToken }
    
    const user = JSON.stringify(req?.user);

    res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Welcome ${req?.user?.fullName}</h1>
    <script>
    window.opener.postMessage(${user}, 'http://localhost:3000')
    </script>
</body>
</html>`);
  }
);
module.exports = router;
