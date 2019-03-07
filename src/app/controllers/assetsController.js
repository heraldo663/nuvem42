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
    this.router.get("/", this.get);
    this.router.post("/", upload.single("file"), this.create);
    this.router.delete("/:id", this.delete);
  }

  async get(req, res) {
    const assets = await Assets.findAll({
      where: {
        bucketId: req.params.bucket_id
      }
    });
    return res.send(assets);
  }

  async create(req, res) {
    // TODO: refatorar dirname
    let dirName = req.user.username.split(" ");
    dirName = dirName.join("-");

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

    const asset = await Assets.create(newAsset);
    return res.send(asset);
  }

  async delete(req, res) {
    const asset = await Assets.findById(req.params.id);
    let dirName = req.user.username.split(" ");
    dirName = dirName.join("-");
    fs.unlink(`${baseDir}/${dirName}/${asset.filename}`, err =>
      console.log(err)
    );
    await asset.destroy();
    res.send({ success: true });
  }
}

module.exports = new AssetsController().router;
