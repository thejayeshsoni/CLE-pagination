const express = require("express");
const app = express();

app.use(express.json());

const student = require("./routes/studentRoutes");
app.use("/students", student);

module.exports = app;