const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        const originalName = file.originalname.toLowerCase().split('.');
        //+ "." + originalName[1]
        cb(null, originalName[0] + '-' +req.body.title)
    }
});
 
const upload = multer({ storage: storage });

module.exports = upload