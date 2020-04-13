const bodyParser = require("body-parser");
const cors = require("cors");
var morgan = require("morgan");

module.exports = function (app) {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(morgan("dev"));
};
