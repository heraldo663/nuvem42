module.exports = fn => {
  return async (req, res, next) => {
    try {
      return fn(req, res, next);
    } catch (error) {
      return res.status(500).json({ error, success: false });
    }
  };
};
