var app = require("./server/server");

// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 3000;

//routers extension
//var api = require('./server/api')
//routers
/* var apiRouter = express.Router()
apiRouter.use('/api', api) */

/* app.get("/", (req, res) => {
  res.header("Content-Type", "application/json; charset=utf-8");
  res.json({ json: "it is json response object set" });
}); */

app.listen(port, function () {
  console.log("Our app is running on http://localhost:" + port);
});
