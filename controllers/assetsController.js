const { Assets } = require("../models");
const fs = require("fs");
const baseDir = process.env.MEDIA_ROOT;

// @TODO: implemente validation
module.exports = {
  async getAssets(req, res) {
    try {
      const assets = await Assets.findAll({
        where: {
          bucketId: req.params.bucket_id
        }
      });
      return res.send(assets);
    } catch (error) {
      res.status(500).json({ error, success: false });
    }
  },
  async createAssets(req, res) {
    // TODO: refatorar dirname
    let dirName = req.user.username.split(" ");
    dirName = dirName.join("-");
    try {
      const newAsset = {
        name: req.file.originalname,
        mimeType: req.file.mimetype,
        encoding: req.file.encoding,
        filename: req.file.filename,
        size: req.file.size,
        bucketId: req.params.bucket_id,
        url: `${process.env.APP_URL}media/${dirName}/${req.file.filename}`
      };

      const asset = await Assets.create(newAsset);
      return res.send(asset);
    } catch (error) {
      res.status(500).json({ error, success: false });
    }
  },

  async deleteAssets(req, res) {
    try {
      const asset = await Assets.findById(req.params.id);
      let dirName = req.user.username.split(" ");
      dirName = dirName.join("-");
      console.log(`${baseDir}/${dirName}/${asset.filename}`);
      fs.unlink(`${baseDir}/${dirName}/${asset.filename}`, err =>
        console.log(err)
      );
      asset.destroy();
      res.send({ success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    }
  }
};
