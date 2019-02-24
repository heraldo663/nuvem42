const express = require("express");
const router = express.Router();
const {
  getUsers,
  patchUser,
  deleteUser
} = require("../../controllers/adminController");

router.get("/", getUsers);

router.patch("/:id", patchUser);
router.delete("/:id", deleteUser);

module.exports = router;
