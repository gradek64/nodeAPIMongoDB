var extendedRouter = require("express").Router();
var controller = require("./postController");
var auth = require("../../middleware/auth");

/**
 * Post needs to know about author
 * to create post
 * to update post
 * to delete post
 * therefore we need extra middlaware to get current user
 */
//checkUser = [auth.decodeUserToken(), auth.getCurrentUser()];
var authenticate = [auth.decodeUserToken()];

//express middleware for id params before U get to "/:id"
extendedRouter.param("id", controller.param);
//api/posts
extendedRouter.route("/").get(authenticate, controller.get); //get user posts
extendedRouter.route("/create").post(authenticate, controller.create); //create one

extendedRouter
  .route("/:id")
  .get(authenticate, controller.getOne) //get one
  .put(authenticate, controller.put) //update one
  .delete(authenticate, controller.delete); //delete one

module.exports = extendedRouter;
