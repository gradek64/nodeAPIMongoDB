var extendedRouter = require("express").Router();
var controller = require("./postController");

//check this middleware for id params before U get to "/:id"
extendedRouter.param("id", controller.param);
//api/posts
extendedRouter
  .route("/")
  .get(controller.get) //get all
  .post(controller.post); //create one

extendedRouter
  .route("/:id")
  .get(controller.getOne) //get one
  .put(controller.put) //update one
  .delete(controller.delete); //delete one

module.exports = extendedRouter;
