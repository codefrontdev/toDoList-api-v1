const passport = require("passport");
const User = require("../models/UserModel");
const { generateToken } = require("../middleware/tokenMiddleware");
const ApiError = require("../utils/ApiError");
const GithubStrategy = require("passport-github2").Strategy;

passport.use(
  "auth-github",
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/v1/auth/github/callback",
      scope: ["user:email"],
    },
    async function (accessToken, refreshToken, profile, done) {
      const defaultUser = {
        fullName: profile.username,
        email: profile.emails[0].value,
        githubId: profile.id,
        picture: profile.photos[0].value,
      };

      try {
        console.log(defaultUser);
        const user = await User.findOrCreate({
          where: { githubId: profile.id },
          defaults: defaultUser,
        });

        if (!user) {
          return new ApiError("Couldn't find user", 404);
        }

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);
