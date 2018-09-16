const multer = require('multer');
const path = require('path')
const fs = require('fs');

const baseDir = path.join(__dirname, `../${process.env.MEDIA_ROOT}`);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let err = null;
    if (!fs.existsSync(`${baseDir}/${req.user.username}`)) {
      fs.mkdirSync(`${baseDir}/${req.user.username}`);
    }
    cb(err, `${baseDir}/${req.user.username}`)
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');

    cb(null, Date.now() + '-' + name);
  }
})

module.exports = storage;