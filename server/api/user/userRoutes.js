var extendedRouter = require("express").Router();
var auth = require("../../middleware/auth");

//auth validation middleware
var validateCreateUser = require("../../middleware/auth").validateCreateUser;
var verifyUser = require("../../middleware/auth").verifyUser();
var authenticate = [auth.decodeUserToken()];
// controllers;
var userController = require("./userController");

//param looks for id in this case (has to be first in stack)
extendedRouter.param("id", userController.param);

// POST api/users/...
extendedRouter.post("/create", validateCreateUser(), userController.create);
extendedRouter.post(
  "/signin",
  verifyUser /*no Controller all verify in middleware*/
);
extendedRouter.put("/update", authenticate, userController.update);

// GET api/users/...
extendedRouter.get("/" /*no authorization*/, userController.get);
extendedRouter
  .route("/:id")
  .get(/*no authorization this route*/ userController.getOne) //get one
  .put(authenticate, userController.update) //update one
  .delete(authenticate, userController.delete); //delete one

module.exports = extendedRouter;
