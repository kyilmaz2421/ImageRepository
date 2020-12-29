const express = require("express");
const router = new express.Router();
const Image = require("../models/image");

const fs = require("fs");
const path = require("path");
const upload = require("../middleware/imageUpload");

//GETS IMAGES (accepts search queries)
router.get("/", (req, res) => {
  const query = {};
  if (req.query.search) {
    query.title = { $regex: req.query.search, $options: "i" };
  }
  Image.find(query, function (err, images) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { images, isSearch: req.query.search });
    }
  });
});

//SERVE PAGE TO UPLOAD IMAGE
router.get("/new", (req, res) => {
  res.render("new", {error: null});
});

//CREATE
router.post("/", upload, (req, res) => {
  const publicDirectoryPath = path.join(__dirname, "../../public");
  var imageObj = {
    title: req.body.title,
    description: req.body.description,
    image: {
      data: fs.readFileSync(
        path.join(publicDirectoryPath + "/images/" + req.file.filename)
      ),
      contentType: req.file.mimetype,
      filename: req.file.filename,
    },
  };
  Image.create(imageObj, function (err, newEntry) {
    if (err) {
      console.log(err);
    }
    res.redirect("/images");
  });
});

//SHOW
router.get("/:id", (req, res) => {
  Image.findById(req.params.id, function (err, image) {
    if (err) {
      res.redirect("/images");
    } else {
      res.render("show", { image });
    }
  });
});

//SERVES EDIT PAGE
router.get("/:id/edit", (req, res) => {
  Image.findById(req.params.id, function (err, image) {
    if (err) {
      res.redirect("/images");
    } else {
      res.render("edit", { image });
    }
  });
});

//SUBMITS EDITS
router.put("/:id/", (req, res) => {
  Image.findOne({ _id: req.params.id }, (err, image) => {
    if (err) {
      res.redirect("/images");
    } else {
      image.description = req.body.image.description;
      image.title = req.body.image.title;
      image.save((err) => {
        if (err) {
          res.redirect("/images");
        } else {
          res.redirect("/images/" + req.params.id);
        }
      });
    }
  });
});

//DESTROY
router.delete("/:id", (req, res) => {
  Image.findOne({ _id: req.params.id }, (err, image) => {
    if (err) {
      res.redirect("/images");
      console.error(err);
    } else {
      const imagePath =
        path.join(__dirname, "../../public") +
        "/images/" +
        image.image.filename;
      fs.unlink(imagePath, (err) => {
          image.remove((err) => {
            if (err) {
              console.error(err);
            }
            res.redirect("/images");
        });
      });
    }
  });
});

module.exports = router;
