const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const originalName = file.originalname.toLowerCase().split(".");
    cb(null, originalName[0] + "-" + req.body.title);
  },
});

const uploader = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2 mb
  },
  fileFilter: function (req, file, cb) {
    // Allowed ext
    const allowedFiletypes = ["jpeg", "jpg", "gif", "png"];
    const ext = file.mimetype.split("/")[1];
    // Check ext
    if (allowedFiletypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
}).single("myImage");

const upload = (req, res, next) => {
  uploader(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.render("new", {
        error:
          "Only .png, .jpg, .jpeg, and .gif files under 2mb are allowed!",
      });
    }
    next();
  });
};

module.exports = upload;
