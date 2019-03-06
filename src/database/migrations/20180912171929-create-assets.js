"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Assets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      filename: {
        allowNull: false,
        type: Sequelize.STRING
      },
      encoding: {
        allowNull: false,
        type: Sequelize.STRING
      },
      mimetype: {
        allowNull: false,
        type: Sequelize.STRING
      },
      size: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING
      },

      flagColor: {
        type: Sequelize.STRING,
        validate: {
          is: /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i
        }
      },

      bucketId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Buckets",
          key: "id"
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    return queryInterface.dropTable("Assets");
  }
};
