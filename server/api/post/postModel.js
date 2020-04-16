var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  text: String,
  //author is ObjectId reference being referenced in user Collections
  author: { type: Schema.Types.ObjectId, ref: "users" },
  date: { type: Date, default: Date.now },
});

PostSchema.pre("save", function (next) {
  next();
});

//creates collection Post mongoDB wil converts to posts
var Post = mongoose.model("Post", PostSchema);
module.exports = Post;
