var extendedRouter = require("express").Router();

//api/users
extendedRouter.route("/").get(function (req, res) {
  res.send({ ok: true });
});

module.exports = extendedRouter;
