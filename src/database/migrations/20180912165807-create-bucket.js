"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Buckets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER
      },
      bucket: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Field Required"
          }
        }
      },

      isFavorite: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },

      flagColor: {
        type: Sequelize.STRING,
        validate: {
          is: /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Users",
          key: "id"
        },
        validate: {
          notEmpty: {
            msg: "Field Required"
          }
        }
      },
      rootBucketId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Buckets",
          key: "id"
        },
        validate: {
          notEmpty: {
            msg: "Field Required"
          }
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Buckets");
  }
};
