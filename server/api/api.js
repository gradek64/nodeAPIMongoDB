var apiRouter = require("express").Router();

//extended routes a
//api/users
apiRouter.use("/users", require("./user/userRoutes"));
//api/posts
apiRouter.use("/posts", require("./post/postRoutes"));

module.exports = apiRouter;
