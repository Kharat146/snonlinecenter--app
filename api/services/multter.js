const multer = require("multer");
const path = require("path");
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads/"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    file["extname"] = ext;
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});
// console.log("uhfiweifiufuiwehfuihwifuhewfiewhfuheufh");
const upload = multer({ storage: storage });

module.exports = upload;