'use strict';
module.exports = (sequelize, DataTypes) => {
  const Assets = sequelize.define('Assets', {
    name: DataTypes.STRING,
    filename: DataTypes.STRING,
    mimetype: DataTypes.STRING,
    encoding: DataTypes.STRING,
    size: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {});
  Assets.associate = function (models) {
    // associations can be defined here
    Assets.belongsTo(models.Bucket, {
      foreignKey: 'bucketId',
      onDelete: 'CASCADE'
    });

  };
  return Assets;
};