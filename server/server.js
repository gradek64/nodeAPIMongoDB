var express = require("express");
var app = express();
var apiRouter = require("./api/api");
//var userRouter = require("./api/user");

//test data is: {username:test, password:test } and hosted on: mylab

//apply middleware
require("./middleware")(app);
//connect Db
require("../connectMongoDB");

//main api route regiester
app.use("/api", apiRouter);
//authorization route
//1 execute domain/users/
//app.use("/users", userRouter);

module.exports = app;
