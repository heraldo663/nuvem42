require("dotenv").config();

if (process.env.NODE_ENV == "test") {
  module.exports = {
    dialect: "sqlite",
    storage: "./tests/database.sqlite",
    operatorsAliases: false,
    logging: false,
    define: {
      timestamps: true,
    },
  };
} else {
  module.exports = {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    operatorsAliases: false,
    logging: false,
    define: {
      timestamps: true,
    },
  };
}
