const express = require("express");
const { connection } = require("./config/postgresql");
const cors = require("cors");
const passport = require("passport");
const globalErrorMiddleware = require("./middleware/ErrorMiddleware");
const ApiError = require("./utils/ApiError");
// const cookieSession = require("cookie-session");
const session = require("express-session");
require("dotenv").config();
require("./config/passportStrategy");

const app = express();

connection();

app.use(
  express.json(session(),{
    limit: "50mb",
    extended: true,
  })
);

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204,

    // allowedHeaders: {
    //   "Access-Control-Allow-Origin": "http://localhost:3001",
    //   // "Access-Control-Allow-Credentials": true,
    // },
  })
); // enable all origins

app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/auth", require("./routers/authRoute"));
app.use("/api/v1/user", require("./routers/userRoute"));
app.use("/api/v1/profile", require("./routers/profileRoute"));
app.use("/api/v1/task", require("./routers/taskRoute"));
app.use("/api/v1/sub-task", require("./routers/subTaskRoute"));
app.use("/api/v1/workspace", require("./routers/workspaceRoute"));

// Error Api
app.use("*", (req, res, next) => {
  next(new ApiError(`Can't find ${req.originalUrl} on this server`, 404));
});

// global error handling midleware
app.use(globalErrorMiddleware);

// run listen
app.listen(5000, () => {
  console.log("listening on port 3000");
});

// Handle rejection outside express
process.on("unhandledRejection", (err) => {
  console.log(`unhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.log("Shutting down...");
    process.exit(1);
  });
});
