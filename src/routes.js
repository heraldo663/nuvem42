const express = require("express");
const passport = require("passport");
const authRoutes = require("./app/routes/authRoutes");
const bucketControllerRouter = require("./app/controllers/bucketController");
const assetsControllerRouter = require("./app/controllers/assetsController");

const router = express.Router();

router.use("/auth", authRoutes);
router.use(
  "/bucket",
  passport.authenticate("jwt", { session: false }),
  bucketControllerRouter
);

router.use(
  "/bucket/:bucket_id/assets",
  passport.authenticate("jwt", { session: false }),
  assetsControllerRouter
);

module.exports = router;
