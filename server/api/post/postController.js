var Post = require("./postModel");
//express build-in param middleware
//in this case will look for api/posts/id
/**
 * IMPORTAANT
 * exports.param is middleware that is going to be executed first
 * and will look for id param and assign to req.post = post
 * that way if we execute app.getOne() then we already have post id sorted and found in app.param
 * it saves time to look for id in every single request app.param will find it first for us !
 */
//get id for all using /:id authorized
exports.param = function (req, res, next, id) {
  Post.findOne({ _id: id }).then(
    function (post) {
      console.log("post", post);
      !post
        ? next(new Error("No post with that id"))
        : ((req.post = post), next());
    },
    function (err) {
      res.status(400).json({
        message: err + "::---id not found in Database---",
      });
    }
  );
};

//create post api/posts/create authorized
exports.create = function (req, res, next) {
  var { title, text } = req.body;
  //user id is sent in red.userID from decoded token in previous middleware
  var newPost = { title, text, author: req.userID };
  Post.create(newPost).then(
    function (newpost) {
      res.json(newpost);
    },
    function (err) {
      next(new Error(err));
    }
  );
};

//get all posts : api/posts authorized
exports.get = function (req, res, next) {
  Post.find().then(
    function (posts) {
      res.json(posts);
    },
    function (err) {
      next(new Error(err));
    }
  );
};

//getOne post api/posts/:id authorized
exports.getOne = function (req, res, next) {
  var post = req.post; //comes from app.param no need to look for one here
  res.json(post); //no need for error checking either done in app.param
};

//update post api/posts/:id authorized
exports.put = function (req, res, next) {
  var post = req.post; //comes from app.param no need to look for one here from /:id
  var update = req.body; //comes from request
  //mutate post by Object.assign() will mutate original post with update behind the scenes
  Object.assign(post, update);
  post.save(function (err, saved) {
    err ? next(err) : res.json(saved);
  });
};

//delete post api/posts/:id authorized
exports.delete = function (req, res, next) {
  var post = req.post; //comes from app.param no need to look for one here
  post.remove(function (err, deletedPost) {
    err ? next(err) : res.json(deletedPost);
  });
};
