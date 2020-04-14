//CONNECT TO MONGODB
// =============================================================================
var mongoose = require("mongoose");
/**
 * this is mongoDb database connection connected remotly by myLab clod
 * gradek:grzesiek64@nodeapi => user:pass@nameofDatabase
 */

/**
 * database user:
 * login directly from cloud services
 * url: https://cloud.mongodb.com/
 * email:gradek64@yahoo.com
 * pass:grzesiek64
 */

/** 
  * //server user: 
    {username:test, password:test } and hosted on: mylab
  * 
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
// =============================================================================
