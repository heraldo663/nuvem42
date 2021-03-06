"use strict";
module.exports = (sequelize, DataTypes) => {
  const Bucket = sequelize.define(
    "Bucket",
    {
      bucket: DataTypes.STRING,
      isFavorite: DataTypes.BOOLEAN,
      flagColor: DataTypes.STRING,
      userId: DataTypes.INTEGER
    },
    {}
  );
  Bucket.associate = function(models) {
    // associations can be defined here
    Bucket.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });

    Bucket.belongsTo(models.Bucket, {
      foreignKey: "rootBucketId",
      onDelete: "CASCADE"
    });
  };

  return Bucket;
};
