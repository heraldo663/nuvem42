const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  getUsers,
  patchUser,
  deleteUser
} = require("../../controllers/adminController");

const { isAdmin } = require("../../middleware/isAdmin");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  getUsers
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  patchUser
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  deleteUser
);

module.exports = router;
