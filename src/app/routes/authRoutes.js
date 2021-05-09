const express = require("express");
const authController = require("../controllers/authController");

const isNoUserRegistred = require("../middleware/isNoUserRegistred");
const schemaValidation = require("../middleware/schemaValidation");
const {
  registerSchema,
  forgotPasswordSchema,
  updatePasswordSchema,
  refreshTokenSchema,
  loginSchema,
} = require("../validations/authSchemas");

const router = express.Router();

router.post(
  "/register",
  schemaValidation(registerSchema),
  isNoUserRegistred,
  authController.register.bind(authController)
);
router.post(
  "/login",
  schemaValidation(loginSchema),
  authController.login.bind(authController)
);
router.post(
  "/forgot_password",
  schemaValidation(forgotPasswordSchema),
  authController.forgotPass.bind(authController)
);
router.post(
  "/update_password",
  schemaValidation(updatePasswordSchema),
  authController.updatePassword.bind(authController)
);
router.post(
  "/refresh_token",
  schemaValidation(refreshTokenSchema),
  authController.refreshToken.bind(authController)
);

module.exports = router;
