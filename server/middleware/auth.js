var jwt = require("jsonwebtoken");
var User = require("../api/user/userModel");

exports.decodeUserToken = function () {
  return function (req, res, next) {
    try {
      console.log("req.headers.authorization", req.headers.authorization);
      var token = req.headers.authorization.split(" ")[1];
      var decoded = jwt.verify(token, "secret");
      //_user attached to JSON web token
      req.userID = decoded._user;
      next();
    } catch (error) {
      return res.status(401).json({
        message: "not Authenticated",
      });
    }
  };
};

exports.validateCreateUser = function () {
  return function (req, res, next) {
    var { username, password } = req.body;
    //if no username or password sent resolve with...
    !username || !password
      ? res.status(400).send("to create user U need username and password!")
      : next();
  };
};
//step 3.
//middlware that makes all operations/validation to get token to the client
exports.verifyUser = function () {
  return function (req, res, next) {
    var { username, password } = req.body;
    //if no username or password sent resolve with...
    console.log(req.body);
    if (!username || !password) {
      return res.status(400).send("U need username or password!");
    } else {
      //step 3a. --- look in database for the username sent  ----
      User.findOne({ username: username }).then(function (user) {
        if (!user) {
          return res.status(401).json({
            message: "not verified once",
          });
        } else {
          if (!user.authenticate(password)) {
            return res.status(401).json({
              message: "wrong password",
            });
          } else {
            //create token if you get here
            jwt.sign(
              //payload sent check in https://jwt.io/
              {
                _user: user._id,
                //expires in one hour
                exp: Math.floor(Date.now() / 1000) + 60 * 60,
              },
              "secret", //secret key need for verification jwt.verify(token, "secret");
              null, //extra option as encoding
              function (err, token) {
                if (err) {
                  return res
                    .status(500)
                    .json({ message: "token not generated" });
                }
                if (token) {
                  return res.json({ token: token });
                }
              }
            );
          }
        }
      });
    }
  };
};
