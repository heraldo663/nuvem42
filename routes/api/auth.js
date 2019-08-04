const express = require("express");
const router = express.Router();
const { register, login, update } = require("../../controllers/authController");
const passport = require("passport");
const { isAdmin } = require("../../middleware/isAdmin");

/* GET home page. */
router.post(
  "/register",
  // passport.authenticate("jwt", { session: false }),
  // isAdmin,
  register
);
router.post("/login", login);

router.patch("/update", update);

module.exports = router;
