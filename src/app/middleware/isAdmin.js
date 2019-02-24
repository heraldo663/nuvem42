module.exports = {
  isAdmin(req, res, next) {
    if (req.user.email == process.env.ADMIN_EMAIL) {
      return next();
    } else {
      return res.status(401);
    }
  }
};
