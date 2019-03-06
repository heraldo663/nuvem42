const { Bucket } = require("../models");
const express = require("express");

// @TODO: implemente validation

class BucketsController {
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {
    this.router.get("/", this.getBuckets);
    this.router.get("/:id", this.getBucket);
    this.router.post("/", this.createBucket);
    this.router.patch("/:id", this.patchBucket);
    this.router.delete("/:id", this.deleteBucket);
  }

  async getBuckets(req, res) {
    const root = await Bucket.findOne({
      where: {
        userId: req.user.id,
        bucket: "root",
        rootBucketId: null
      }
    });
    const buckets = await Bucket.findAll({
      where: {
        userId: req.user.id,
        rootBucketId: root.id
      }
    });

    return res.json({
      buckets,
      rootId: root.id
    });
  }

  async getBucket(req, res) {
    const buckets = await Bucket.findAll({
      where: {
        userId: req.user.id,
        rootBucketId: req.params.id
      }
    });

    return res.json(buckets);
  }

  async createBucket(req, res) {
    const root = await Bucket.findOne({
      where: {
        userId: req.user.id,
        bucket: "root",
        rootBucketId: null
      }
    });
    const newBucket = {
      bucket: req.body.bucket,
      rootBucketId: req.body.rootBucketId || root.id,
      userId: req.user.id
    };

    if (!newBucket.bucket) {
      return res
        .status(400)
        .send({ success: false, error: "name cannot be blank" });
    }
    const bucket = await Bucket.create(newBucket);
    return res.json(bucket);
  }

  async patchBucket(req, res) {
    let bucketModel = await Bucket.findOne({ id: req.params.id });
    const { bucket } = req.body;
    if (bucket) {
      const updatedBucket = await bucketModel.update({
        bucket
      });
      return res.json(updatedBucket);
    }
  }

  async deleteBucket(req, res) {
    const bucket = await Bucket.findById(req.params.id);
    bucket.destroy();
    res.json({ success: true });
  }
}

module.exports = new BucketsController().router;
