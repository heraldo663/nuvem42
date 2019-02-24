const { User } = require("../models");
const bcrypt = require("bcryptjs");

module.exports = async () => {
  const adminUser = {
    username: "nuvem42",
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD
  };

  const admin = await User.findOne({ where: { email: adminUser.email } });

  if (!admin) {
    await User.create(adminUser);
    console.log("admin user created!");
  } else {
    console.log("admin already exits");
  }
};
