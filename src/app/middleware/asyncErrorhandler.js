module.exports = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(err => {
    res.status(500).json(
      new JSONAPIError({
        status: 500,
        title: "Server Error",
        detail: "Try again later"
      })
    );
  });
};
