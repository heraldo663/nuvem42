const { User } = require("../models");
const bcrypt = require("bcryptjs");

const adminUser = {
  username: "nuvem42",
  email: "numvem42@admin.com",
  password: "fileserver42"
};

const admin = await User.findOne({ where: { email: adminUser.email } });

if (!admin) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(adminUser.password, salt, async (err, hash) => {
      if (err) throw err;
      adminUser.password = hash;
      await User.create(adminUser);
    });
  });
}
