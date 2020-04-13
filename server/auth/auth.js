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
    var password = req.body.pass;
    console.log(req.body);
    //if no username or password resolve with...
    if (!username || !password) {
      res.status(400).send("to create user U need username and password!");
    } else {
      var newUser = { username: username, pass: password };
      console.log("newUser", newUser);
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
      User.find().then((users) => {
        console.log("users", users);
      });
      //look in database for the user
      //test data is: {username:test, password:test } and hosted on: mylab
      // https://cloud.mongodb.com/v2/5e8eda02f8def942a350ce40#security/database/users
      User.findOne({ username: username }).then(function (user) {
        if (!user) {
          res.status(401).send("No user with the given username");
        } else {
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

//not in use at the moment !!
exports.signToken = function (id) {
  return jwt.sign({ _id: id }, config.secrets.jwt, {
    expiresinMunutes: config.expireTime,
  });
};
