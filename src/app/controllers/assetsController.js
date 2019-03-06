const { Assets } = require("../models");
const express = require("express");
const fs = require("fs");
const multer = require("multer");
const storage = require("../../config/multer");

const baseDir = process.env.MEDIA_ROOT;

// @TODO: implemente validation

class AssetsController {
  constructor() {
    this.router = express.Router({ mergeParams: true });
    this.routes();
  }

  routes() {
    const upload = multer(storage);

    this.router.get("/", this.getAssets);
    this.router.post("/", upload.single("file"), this.createAssets);
    this.router.delete("/:id", this.deleteAssets);
  }

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
  }

  async createAssets(req, res) {
    // TODO: refatorar dirname
    let dirName = req.user.username.split(" ");
    dirName = dirName.join("-");

    try {
      const newAsset = {
        name: req.file.originalname,
        mimetype: req.file.mimetype,
        encoding: req.file.encoding,
        filename: req.file.filename,
        size: req.file.size,
        bucketId: req.params.bucket_id,
        userId: req.user.id,
        url: `${process.env.APP_URL}media/${dirName}/${req.file.filename}`
      };

      console.log(newAsset);

      const asset = await Assets.create(newAsset);
      return res.send(asset);
    } catch (error) {
      res.status(500).json({ error, success: false });
    }
  }

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
}

module.exports = new AssetsController().router;
