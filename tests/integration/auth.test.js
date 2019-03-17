const request = require("supertest");
const faker = require("faker");
const { User, Bucket } = require("../../src/app/models");
const server = require("../../src/app");

beforeAll(async () => {
  User.truncate({
    cascade: true
  });
});

describe("register", () => {
  it("should register a superuser", async () => {
    const newUser = {
      username: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    const res = await request(server)
      .post("/api/auth/register")
      .send(newUser);
    expect(res.status).toBe(201);
    expect(res.body.data.attributes["is-super-user"]).toBe(true);
    expect(res.body.data.attributes["is-user-active"]).toBe(false);
  });
  it("should register a normal user", async () => {
    const newUser = {
      username: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    const res = await request(server)
      .post("/api/auth/register")
      .send(newUser);
    expect(res.status).toBe(201);
    expect(res.body.data.attributes["is-super-user"]).toBe(false);
    expect(res.body.data.attributes["is-user-active"]).toBe(false);
  });
  it("should fail to resgister a normal user withot an email", async () => {
    const newUser = {
      username: faker.name.firstName(),
      password: faker.internet.password()
    };

    const res = await request(server)
      .post("/api/auth/register")
      .send(newUser);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
  });
  it("should fail to resgister a normal user with invalid email", async () => {
    const newUser = {
      username: faker.name.firstName(),
      email: "testteste",
      password: faker.internet.password()
    };

    const res = await request(server)
      .post("/api/auth/register")
      .send(newUser);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
  });
  it("should fail to resgister a normal user without username", async () => {
    const newUser = {
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    const res = await request(server)
      .post("/api/auth/register")
      .send(newUser);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
  });
  it("should fail to resgister a normal user with password with less then 5 characters", async () => {
    const newUser = {
      username: faker.name.firstName(),
      email: faker.internet.email(),
      password: `1234`
    };

    const res = await request(server)
      .post("/api/auth/register")
      .send(newUser);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
  });
});
