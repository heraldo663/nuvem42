const { factory } = require("factory-girl");
const { User } = require("../src/app/models");
const faker = require("faker");

factory.define("User", User, {
  username: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  isSuperUser: false,
  isUserActive: false
});

module.exports = factory;
