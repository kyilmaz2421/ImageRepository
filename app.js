var express = require("express"),
  app = express();
(bodyParser = require("body-parser")),
  (mongoose = require("mongoose")),
  (methodOverride = require("method-override")),
  (sanitizer = require("express-sanitizer"));

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(sanitizer());
app.use(methodOverride("_method"));

mongoose.connect("mongodb://localhost/blogApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now },
});

var blog = mongoose.model("blog", blogSchema);

//INDEX
app.get("/", function (req, res) {
  res.redirect("/blogs");
});
//INDEX
app.get("/blogs", function (req, res) {
  blog.find({}, function (err, blogs) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { blogs: blogs });
    }
  });
});

//NEW
app.get("/blogs/new", function (req, res) {
  res.render("new");
});

//CREATE
app.post("/blogs", function (req, res) {
  req.body.blog.body = req.sanitize(req.body.blog.body);
  blog.create(req.body.blog, function (err, newEntry) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/blogs");
    }
  });
});

//SHOW
app.get("/blogs/:id", function (req, res) {
  blog.findById(req.params.id, function (err, foundBlog) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("show", { blog: foundBlog });
    }
  });
});

//EDIT
app.get("/blogs/:id/edit", function (req, res) {
  blog.findById(req.params.id, function (err, foundBlog) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("edit", { blog: foundBlog });
    }
  });
});

app.put("/blogs/:id/", function (req, res) {
  req.body.blog.body = req.sanitize(req.body.blog.body);
  blog.findByIdAndUpdate(
    req.params.id,
    req.body.blog,
    function (err, foundBlog) {
      if (err) {
        res.redirect("/blogs");
      } else {
        res.redirect("/blogs" + req.params.id);
      }
    }
  );
});

//DESTROY
app.delete("/blogs/:id", function (req, res) {
  blog.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs");
    }
  });
});

app.listen(3000, function () {
  console.log("Node started at 3000");
});
