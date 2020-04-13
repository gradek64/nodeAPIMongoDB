var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var postSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  text: String,
  //author is ObjectId reference being referenced in user Collections
  author: { type: Schema.Types.ObjectId, ref: "users" },
  date: { type: Date, default: Date.now },
});

module.exports = postSchema;
