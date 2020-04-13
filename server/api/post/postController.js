var PostModel = require("./postModel");
//express build-in param middleware
//in this case will look for api/posts/id
/**
 * IMPORTAANT
 * exports.param is middleware that is going to be executed first
 * and will look for id param and assign to req.post = post
 * that way if we execute app.getOne() then we already have post id sorted and found in app.param
 * it saves time to look for id in every single request app.param will find it first for us !
 */

exports.param = function (req, res, next, id) {
  PostModel.find(id).then(function (post) {
    !post
      ? next(new Error("No post with that id"))
      : ((req.post = post), next());
  });
};

//create post
exports.post = function (req, res, next) {
  var newPost = req.body;
  PostModel.create(newPost).then(
    function (newpost) {
      req.json(newpost);
    },
    function (err) {
      next(new Error(err));
    }
  );
};

//get all posts
exports.get = function (req, res, next) {
  PostModel.find().then(
    function (posts) {
      req.json(posts);
    },
    function (err) {
      next(new Error(err));
    }
  );
};

//getOne post
exports.getOne = function (req, res, next) {
  var post = req.post; //comes from app.param no need to look for one here
  req.json(post); //no need for error checking either done in app.param
};

//update post
exports.put = function (req, res, next) {
  var post = req.post; //comes from app.param no need to look for one here
  var update = req.body; //comes from request
  //mutate post by Object.assign() will mutate original post with update behind the scenes
  Object.assign(post, update);

  post.save(function (err, saved) {
    err ? next(err) : req.json(saved);
  });
};

//delete post
exports.delete = function (req, res, next) {
  var post = req.post; //comes from app.param no need to look for one here
  post.remove(function (err, deletedPost) {
    err ? next(err) : req.json(deletedPost);
  });
};
