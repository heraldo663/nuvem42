require("../setup");
const faker = require("faker");
const { User } = require("../../models");

beforeEach(() => {
  User.destroy({
    where: {},
    truncate: true
  });
});

describe("register", () => {
  it("should register a user", async () => {
    const newUser = {
      username: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    const res = await request.post("/api/auth/register").send(newUser);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("name", newUser.name);
  });
  it("should fail to register a user with password < 4 chars", async () => {
    const newUser = {
      username: faker.name.firstName(),
      email: faker.internet.email(),
      password: "123"
    };

    const res = await request.post("/api/auth/register").send(newUser);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("success", false);
  });
  it("should fail to register a user that already singup", async () => {
    const newUser = {
      username: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    await request.post("/api/auth/register").send(newUser);
    const res = await request.post("/api/auth/register").send(newUser);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("success", false);
  });
});

describe("login", () => {
  it("should fail to login a user", async () => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    const res = await request.post("/api/auth/login").send(user);

    expect(res.status).toBe(400);
  });
  it("should login a user", async () => {
    const user = {
      email: "test@test.com",
      password: "123456",
      username: "tester"
    };

    await request.post("/api/auth/register").send(user);
    delete user.username;

    const res = await request.post("/api/auth/login").send(user);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("success", true);
  });
});
