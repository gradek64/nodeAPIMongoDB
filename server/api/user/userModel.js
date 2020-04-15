var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//instance methhods
UserSchema.methods = {
  authenticate: function (plainTextPassword) {
    return bcrypt.compareSync(plainTextPassword, this.password);
  },
  isAuthenticated: function (token) {
    return jwt.verify(
      token,
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTk3MTRjZWYzYmIxZjM1ZGFkODNlNTAiLCJleHAiOjE1ODY5NjM0NzcsImlhdCI6MTU4Njk1OTg3N30.ALmza3NXlCVds33NaavRsa5qPR_ZCtjtaACD4WS6aAk"
    );
  },
  //hash the password
  encryptPassword: function (plainTextPassword) {
    if (!plainTextPassword) {
      return "";
    } else {
      /**
       * using bcrypt module that also has salt param to make it more
       * securure against attacts
       */
      var saltRounds = 10;
      return bcrypt.hashSync(plainTextPassword, saltRounds);
    }
  },
};

//mongoose middleware that run before document is saved in DB
//we will use it to encrypte textPassword to hash encrypted
UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = this.encryptPassword(this.password);
  next();
});

var User = mongoose.model("User", UserSchema);
module.exports = User;
