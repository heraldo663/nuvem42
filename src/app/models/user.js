"use strict";
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        set(val) {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(val, salt);
          this.setDataValue("password", hash);
        }
      }
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Bucket, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
  };
  return User;
};
