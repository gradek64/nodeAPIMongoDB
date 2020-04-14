var authRouter = require("express").Router();
var verifyUser = require("./auth").verifyUser;
var createUser = require("./auth").createUser;
var authController = require("./controller");

/**
 * there are alos routes level middleware which will executer from right to left
 * for example our /sigin route will execute post request then verifyUser and finally
 * will exuecute controller middleware
 */

//extended route /auth/signin
//step 2
authRouter.post("/signin", verifyUser(), authController.signin);
authRouter.post("/create", createUser());

module.exports = authRouter;
