const JSONAPIError = require("jsonapi-serializer").Error;

module.exports = fn => {
  return async (req, res, next) => {
    try {
      return fn(req, res, next);
    } catch (error) {
      return res.status(500).json(
        new JSONAPIError({
          status: 500,
          title: "Server Error",
          detail: "Try again later"
        })
      );
    }
  };
};
