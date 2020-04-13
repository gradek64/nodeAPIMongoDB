//var User = require("../api/user/userModel");
//var signToken = require("./auth").signToken;

//route auth/signin final step in authorization (when executes this route from all middleware before)
exports.signin = function (req, res, next) {
  //req.user will be there from middleware
  //var token = signToken(req.user._id);
  //final step respond with token
  res.json({ token: "token" });
};
