const mongoose = require("mongoose");
const uri =
  "mongodb+srv://gradek:grzesiek64@nodeapi-7qv5x.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true });
