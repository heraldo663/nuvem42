const multer = require("multer");
const fs = require("fs");
const crypto = require("crypto");
const mkdirp = require("mkdirp");

const baseDir = process.env.MEDIA_ROOT;

const storageType = {
  local: multer.diskStorage({
    destination: async (req, file, cb) => {
      let err = null;
      let dirName = req.user.username.split(" ");
      dirName = dirName.join("-");

      if (!fs.existsSync(`${baseDir}/${dirName}`)) {
        mkdirp(`${baseDir}/${dirName}`, err => console.log(err));
      }
      cb(err, `${baseDir}/${dirName}`);
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        file.key = `${hash.toString("hex")}`;

        cb(null, Date.now() + "-" + file.key);
      });
    }
  })
};

module.exports = {
  storage: storageType.local
};
