const multer = require('multer');
const path = require('path')
const fs = require('fs');

const baseDir = path.join(__dirname, `../${process.env.MEDIA_ROOT}`);
console.log(baseDir)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let err = null;
    fs.readdir(baseDir, (err, files) => {
      files.forEach(file => {
        console.log(file);
      });
    })
    cb(err, `${baseDir}`)
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');

    cb(null, Date.now() + '-' + name);
  }
})

module.exports = storage;