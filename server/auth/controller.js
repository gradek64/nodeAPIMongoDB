//var User = require("../api/user/userModel");
var signToken = require("./auth").signToken;

//route auth/signin final step in authorization (when executes this route from all middleware before)
exports.signin = function (req, res) {
  //req.user will be there from middleware before
  var token = signToken(req.user._id);
  //final step respond with token to client to store in cookies or localstorage
  //then this should/can be used in header {authotication: 'Bearer XXX-XXX=XXX} for
  //https request
  res.json({ token: token });
};
