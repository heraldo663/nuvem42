const express = require("express");
const router = express.Router();
const { register, login, update } = require("../../controllers/authController");

/* GET home page. */
router.post("/register", register);
router.post("/login", login);

router.patch("/update", update);

module.exports = router;
