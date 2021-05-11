const AppError = require("../core/AppError");

module.exports = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    const error = new AppError({
      status: 500,
      message: "Server Error, please try again later",
      errors: ["Server error"],
    });
    res.status(error.statusCode).json(error);
  });
};
