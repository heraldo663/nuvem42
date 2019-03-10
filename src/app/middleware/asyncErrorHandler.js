const JSONAPIError = require("jsonapi-serializer").Error;

module.exports = fn => (...args) => {
  try {
    fn(...args);
  } catch (error) {
    res.status(500).json(
      new JSONAPIError({
        status: 500,
        title: "Server Error",
        detail: "Try again later"
      })
    );
  }
};
