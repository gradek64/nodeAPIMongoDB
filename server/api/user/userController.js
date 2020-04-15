var User = require("./userModel");

//middlware

//-----------------
// CONTROLLERS ARE USUALlY REPSONDING THAT THEIR MAIN ROLE AS res.json()
//--------------------

//express build-in param middleware
//in this case will look for api/users/id

exports.param = function (req, res, next, id) {
  User.findOne({ _id: id }).then(
    function (user) {
      !user
        ? next(new Error("No user with that id"))
        : ((req.user = user), next());
    },
    function (err) {
      res.status(400).json({
        message: err + "::---id not found in Database---",
      });
    }
  );
};

//create new user
exports.create = function (req, res, next) {
  var newUser = req.body;
  User.create(user).then(
    function (user) {
      res.json(user);
    },
    function (err) {
      next(new Error(err));
    }
  );
};

//get all users
exports.get = function (req, res, next) {
  User.find().then(
    function (users) {
      res.json(users);
    },
    function (err) {
      next(new Error(err));
    }
  );
};

//getOne user
//if we execute app.getOne() then we already have post id sorted and found in app.param
exports.getOne = function (req, res, next) {
  var user = req.user; //comes from app.param no need to look for one here
  res.json(user); //no need for error checking either done in app.param
};

//update user
exports.update = function (req, res, next) {
  var user = req.user; //comes from app.param no need to look for one here
  var update = req.body; //comes from request
  //mutate post by Object.assign() will mutate original post with update behind the scenes
  Object.assign(user, update);
  console.log("user,", user);
  user.save(function (err, saved) {
    console.log("saved", saved);
    err ? next(err) : res.json(saved);
  });
};

//delete user
exports.delete = function (req, res, next) {
  var user = req.user; //comes from app.param no need to look for one here
  user.remove(function (err, deletedUser) {
    err ? next(err) : res.json(deletedUser);
  });
};
