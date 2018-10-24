const { Assets } = require("../models");
const fs = require("fs");
const path = require("path");
const baseDir = path.join(__dirname, `../${process.env.MEDIA_ROOT}`);

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
    try {
      console.log(req.file);

      const newAsset = {
        name: req.file.originalname,
        mimeType: req.file.mimetype,
        encoding: req.file.encoding,
        filename: req.file.filename,
        size: req.file.size,
        bucketId: req.params.bucket_id,
        url: `${process.env.APP_URL}${process.env.MEDIA_ROOT}/${
          req.user.username
        }/${req.file.filename}`
      };

      console.log(asset);
      const asset = await Assets.create(newAsset);
      return res.send(asset);
    } catch (error) {
      res.status(500).json({ error, success: false });
    }
  },

  async deleteAssets(req, res) {
    try {
      const asset = await Assets.findById(req.params.id);
      console.log(asset);
      fs.unlinkSync(`${baseDir}/${req.user.username}/${asset.filename}`);
      asset.destroy();
      res.send({ success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    }
  }
};
