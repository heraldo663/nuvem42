const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  getBuckets,
  createBucket,
  patchBucket,
  deleteBucket,
  getBucket
} = require("../../controllers/bucketController");

router.get("/", passport.authenticate("jwt", { session: false }), getBuckets);
router.get("/:id", passport.authenticate("jwt", { session: false }), getBucket);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createBucket
);
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  patchBucket
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteBucket
);

module.exports = router;
