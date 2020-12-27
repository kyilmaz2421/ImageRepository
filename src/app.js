const express = require("express"),
  app = express(),
  path = require("path"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  imageRouter = require("./api/images");
require("./database/mongoose");

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../../public");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(publicDirectoryPath));
app.use(methodOverride("_method"));

app.use("/images", imageRouter);

// ROOT
app.get("/", (req, res) => {
  res.redirect("/images");
});

app.listen(port, function () {
  console.log("Node Server started at", port);
});
