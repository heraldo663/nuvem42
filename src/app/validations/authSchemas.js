const yup = require("yup");

const registerSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required(),
  username: yup.string().required(),
});

const updatePasswordSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required(),
  token: yup.string().required(),
});

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required(),
});

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email().required(),
});

const refreshTokenSchema = yup.object().shape({
  refreshToken: yup.string().required(),
});

module.exports = {
  registerSchema,
  updatePasswordSchema,
  loginSchema,
  forgotPasswordSchema,
  refreshTokenSchema,
};
