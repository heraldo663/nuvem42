const { User } = require("../models");

module.exports = async (req, res, next) => {
  const users = await User.findAll({ limit: 2 });
  if (users.length === 0) {
    res.locals.isFirstUser = true;
    next();
  } else {
    res.locals.isFirstUser = false;
    next();
  }
};
