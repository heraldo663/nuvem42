const { Assets } = require('../models');


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
      console.log(req.file);
      const newAsset = {
        name: req.file.originalname,
        mimeType: req.file.mimetype,
        encoding: req.file.encoding,
        size: req.file.size
      }
      return res.json({ msg: "under construction" });
    } catch (error) {
      res.status(500).json({ error, success: false })
    }
  },

  async deleteAssets(req, res) {
    try {
      const Assets = await Assets.findById(req.params.id);
      Assets.destroy()
      res.json({ success: true })
    } catch (error) {
      res.status(500).json({ error, success: false })
    }
  }
}