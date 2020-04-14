var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
var checkToken = expressJwt({ secret: "token" });
var User = require("../api/user/userModel");

//not in use at the moment !!
exports.decodeToken = function (params) {
  return function (req, res, next) {
    if (req.quuery && res.quuery.hasOwnProperty("access_token")) {
      req.headers.authorization = "Bearer " + req.quuery.access_token;
    }
    //if token send via headers.authrization in first place
    checkToken(req, res, next);
  };
};

//not in use at the moment !!
exports.getFreshUser = function (params) {
  return function (req, res, next) {};
};

exports.createUser = function () {
  return function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    console.log(req.body);
    //if no username or password resolve with...
    if (!username || !password) {
      res.status(400).send("to create user U need username and password!");
    } else {
      var newUser = { username, password };
      //mongodb doesnt allow store passwords in plain text for security reason
      //it has to be encoded
      User.create(newUser).then(
        function (newUser) {
          res.json(newUser);
        },
        function (err) {
          next(new Error(err));
        }
      );
    }
  };
};
//step 3.
//middlware that makes all operations/validation to get token to the client
exports.verifyUser = function () {
  return function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    console.log(req.body);
    //if no username or password resolve with...
    if (!username || !password) {
      res.status(400).send("U need username and password!");
    } else {
      //step 3a. --- look in database for the username sent  ----
      User.findOne({ username: username }).then(function (user) {
        if (!user) {
          res.status(401).send("No user with the given username");
        } else {
          //step 3b. --- autheticate user check if password match by decoding
          //the server password to text password sent and compare  ----
          if (!user.authenticate(password)) {
            res.status(401).send("Wrong password");
          } else {
            req.user = user;
            //last check at this point the outcome req.user is passed to controller(final step);
            next();
          }
        }
      });
    }
  };
};

//jwt module will crate encoded JSON token to us
exports.signToken = function (id) {
  return jwt.sign(
    {
      _id: id,
      //expires in one hour
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    "secret" //it will default to SHA encoding
  );
};
