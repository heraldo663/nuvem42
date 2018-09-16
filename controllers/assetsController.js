const { Assets } = require('../models');
const fs = require('fs');
const path = require('path')
const baseDir = path.join(__dirname, `../${process.env.MEDIA_ROOT}`);

module.exports = {
  async getAssets(req, res) {
    try {
      const assets = await Assets.findAll({
        where: {
          bucketId: req.params.bucket_id
        }
      });

      return res.json(assets);
    } catch (error) {
      res.status(500).json({ error, success: false })
    }
  },
  async createAssets(req, res) {
    try {
      console.log(req.file)
      const newAsset = {
        name: req.file.originalname,
        mimeType: req.file.mimetype,
        encoding: req.file.encoding,
        filename: req.file.filename,
        size: req.file.size,
        bucketId: req.params.bucket_id
      }
      const asset = await Assets.create(newAsset);
      return res.json(asset);
    } catch (error) {
      res.status(500).json({ error, success: false });
    }
  },

  async deleteAssets(req, res) {
    try {
      const asset = await Assets.findById(req.params.id);
      fs.unlinkSync(`${baseDir}/${req.user.username}/${asset.filename}`);
      asset.destroy()
      res.json({ success: true })
    } catch (error) {
      res.status(500).json({ error, success: false })
    }
  }
}