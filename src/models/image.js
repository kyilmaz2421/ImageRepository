const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: {
    data: Buffer,
    contentType: String,
    filename: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
