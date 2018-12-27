const express = require("express");
const router = express.Router();
const {
  getBuckets,
  createBucket,
  patchBucket,
  deleteBucket,
  getBucket
} = require("../../controllers/bucketController");

router.get("/", getBuckets);
router.get("/:id", getBucket);
router.post("/", createBucket);
router.patch(
  "/:id",

  patchBucket
);
router.delete("/:id", deleteBucket);

module.exports = router;
