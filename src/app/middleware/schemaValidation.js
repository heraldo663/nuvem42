const AppError = require("../core/AppError");

module.exports = (schema) => async (req, res, next) => {
  try {
    req.body = await schema.validate(req.body);
    next();
  } catch (error) {
    const err = new AppError({ message: error.message, errors: error.errors });
    res.status(err.statusCode).send(err);
  }
};
