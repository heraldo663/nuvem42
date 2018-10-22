const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const {
  getAssets,
  createAssets,
  deleteAssets
} = require("../../controllers/assetsController");
const multer = require("multer");
const storage = require("../../services/multer");

const upload = multer({ storage });

router.get("/", passport.authenticate("jwt", { session: false }), getAssets);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("file"),
  createAssets
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteAssets
);

module.exports = router;
