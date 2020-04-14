var express = require("express");
var app = express();
var apiRouter = require("./api/api");
var authRouter = require("./auth/routes");

//test data is: {username:test, password:test } and hosted on: mylab

//apply middleware
require("./middleware")(app);
//connect Db
require("../connectMongoDB");

//main api route regiester
app.use("/api", apiRouter);
//authorization route
//1 execute domain/auth/
app.use("/user", authRouter);

module.exports = app;
