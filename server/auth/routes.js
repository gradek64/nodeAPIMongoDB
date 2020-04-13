var authRouter = require("express").Router();
var verifyUser = require("./auth").verifyUser;
var createUser = require("./auth").createUser;
var authController = require("./controller");

//extended route /auth/signin
//step 2
//execute POST domain/auth/signin/ and then run verifyUser() middleware and then final step authController.signin
authRouter.post("/signin", verifyUser(), authController.signin);
authRouter.post("/create", createUser());

module.exports = authRouter;
