const express = require("express");
const connection = require("./config/postgresql");

const app = express();

connection();

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "hello world",
  });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
