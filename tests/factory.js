const { factory } = require("factory-girl");
const { User } = require("../src/app/models");
const faker = require("faker");

factory.define("User", User, {
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password()
});

module.exports = factory;
