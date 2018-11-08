const multer = require("multer");
const fs = require("fs");

const baseDir = process.env.MEDIA_ROOT;

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    let err = null;
    let dirName = req.user.username.split(" ");
    dirName = dirName.join("-");

    if (!fs.existsSync(`${baseDir}/${dirName}`)) {
      fs.mkdir(`${baseDir}/${dirName}`, err => console.log(err));
    }
    cb(err, `${baseDir}/${dirName}`);
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");

    cb(null, Date.now() + "-" + name);
  }
});

module.exports = storage;
