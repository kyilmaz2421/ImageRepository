const express = require("express");
const router = new express.Router();
const Image = require("../models/image");

const fs = require("fs");
const path = require("path");
const upload = require("../middleware/imageUpload");

//INDEX
router.get("/", (req, res) => {
  Image.find({}, function (err, images) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { images });
    }
  });
});

//NEW
router.get("/new", (req, res) => {
  res.render("new");
});

//CREATE
router.post("/", upload.single("myImage"), (req, res) => {
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
  console.log(imageObj.image);
  Image.create(imageObj, function (err, newEntry) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
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

//EDIT
router.get("/:id/edit", (req, res) => {
  Image.findById(req.params.id, function (err, image) {
    if (err) {
      res.redirect("/images");
    } else {
      res.render("edit", { image });
    }
  });
});

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
      console.error(err);
    } else {
      const imagePath =
        path.join(__dirname, "../../public") +
        "/images/" +
        image.image.filename;
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.log(err);
        } else {
          image.remove((err) => {
            if (err) {
              console.error(err);
            }
          });
        }
      });
    }
  });
  res.redirect("/images");
});

module.exports = router;
