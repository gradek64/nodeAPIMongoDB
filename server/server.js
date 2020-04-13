var express = require("express");
var app = express();
var apiRouter = require("./api/api");
var authRouter = require("./auth/routes");

//apply middleware
require("./middleware")(app);

//CONNECT TO MONGODB
// =============================================================================
var mongoose = require("mongoose");
/**
 * this is mongoDb database connection connected remotly by myLab clod
 * gradek:grzesiek64@nodeapi => user:pass@nameofDatabase
 */

/**
 * login directly from cloud services
 * url: https://cloud.mongodb.com/
 * email:gradek64@yahoo.com
 * pass:grzesiek64
 */
const uri =
  "mongodb+srv://gradek:grzesiek64@nodeapi-7qv5x.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true }).then(
  () => {
    console.log("---- mongodb connection open ----");
  },
  (err) => {
    console.error("mongodb connection error");
  }
);

//main api route regiester
app.use("/api", apiRouter);
//authorization route
//1 execute domain/auth/
app.use("/user", authRouter);

module.exports = app;
