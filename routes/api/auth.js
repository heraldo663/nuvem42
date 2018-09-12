const express = require('express');
const router = express.Router();
const { register, login, teste } = require('../../controllers/authController');
const passport = require('passport')

/* GET home page. */
router.post('/register', register);
router.post('/login', login);

module.exports = router;
