const express = require("express");
const passport = require("passport");
const authControllerRouter = require("./app/controllers/authController");
const bucketControllerRouter = require("./app/controllers/bucketController");
const assetsControllerRouter = require("./app/controllers/assetsController");

const router = express.Router();

router.use("/auth", authControllerRouter);
router.use(
  "/bucket",
  passport.authenticate("jwt", { session: false }),
  bucketControllerRouter
);
router.use("/auth", authControllerRouter);

router.use(
  "/bucket/:bucket_id/assets",
  passport.authenticate("jwt", { session: false }),
  assetsControllerRouter
);

module.exports = router;
