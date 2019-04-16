const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/item", { useNewUrlParser: true }).then(
  () => {
    console.log("Database Connected");
  },
  err => {
    console.log("Cant connect to database " + err);
  }
);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/items", require("./routers/api/items"));
app.use(function(err, req, res, next) {
  res.status(422).send({ error: err.message });
});
app.listen(3000, function() {
  console.log("Listening on port 3000");
});
