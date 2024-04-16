const passport = require("passport");
const User = require("../models/UserModel");
const { generateToken } = require("../middleware/tokenMiddleware");
const ApiError = require("../utils/ApiError");
const GithubStrategy = require("passport-github2").Strategy;

const GITHUB_CLIENT_ID = "79254129330d67568fcc";
const GITHUB_CLIENT_SECRET = "7b23ad804ab07220e5fd76394e7b4320181bdb2d";

passport.use(
  "auth-github",
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
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
          return new ApiError('Couldn\'t find user', 404);
        }
        done(null, user);
      } catch (error) {
        done(error, null);
      }

    }
  )
);
