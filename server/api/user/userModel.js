var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

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
