require("dotenv").config();

module.exports = {
  development: {
    username: "docker",
    password: "docker",
    database: "nuvem42_development",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: "docker",
    password: "docker",
    database: "nuvem42_test",
    host: "127.0.0.1",
    dialect: "postgres",
    logging: false,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
  },
};
