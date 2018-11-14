const express = require("express");
const router = express.Router();
const { register, login } = require("../../controllers/authController");
const passport = require('passport');

/* GET home page. */
router.post(
  "/register",
  passport.authenticate("jwt", { session: false }),
 , register
);
router.post("/login", login);

module.exports = router;
