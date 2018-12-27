const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getAssets,
  createAssets,
  deleteAssets
} = require("../../controllers/assetsController");
const multer = require("multer");
const storage = require("../../services/multer");

const upload = multer({ storage });

router.get("/", getAssets);
router.post("/", upload.single("file"), createAssets);
router.delete("/:id", deleteAssets);

module.exports = router;
