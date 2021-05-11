const multer = require("multer");
const fs = require("fs-extra");
const crypto = require("crypto");

const baseDir = process.env.MEDIA_ROOT;

const storageType = {
  local: multer.diskStorage({
    destination: async (req, file, cb) => {
      const dirName = req.user.email;

      fs.ensureDir(`${baseDir}/${dirName}`, (err) => {
        cb(err, `${baseDir}/${dirName}`);
      });
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(8, (err, hash) => {
        if (err) cb(err);

        file.key = `${hash.toString("hex")}`;

        cb(null, Date.now() + "-" + file.key);
      });
    },
  }),
};

module.exports = {
  storage: storageType.local,
};
