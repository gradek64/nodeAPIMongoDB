var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  pass: {
    type: String,
    required: true,
  },
});

//instance methhods
UserSchema.methods = {
  authenticate: function (plainTextPassword) {
    return bcrypt.compareSync(plainTextPassword, this.password);
  },
  //hash the password
  encryptPassword: function (plainTextPassword) {
    if (!plainTextPassword) {
      return "";
    } else {
      //var salt = bcrypt.getSaltSync(10);
      // return bcrypt.hashSync(plainTextPassword, salt);
      return "";
    }
  },
};

//mongoose middleware that run before document is saved in DB
UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = this.encryptPassword(this.password);
  next();
});

var User = mongoose.model("User", UserSchema);
module.exports = User;
