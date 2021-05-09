/* eslint-disable no-undef */
const request = require("supertest");
const faker = require("faker");
const { User, Bucket } = require("../../src/app/models");
const server = require("../../src/app");
const factory = require("../factory");

beforeAll(async () => {
  User.truncate({
    cascade: true,
  });
});

describe("register", () => {
  it("should register a superuser", async () => {
    const newUser = {
      username: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const res = await request(server).post("/api/auth/register").send(newUser);
    expect(res.status).toBe(201);
    expect(res.body.data.attributes["is-super-user"]).toBe(true);
    expect(res.body.data.attributes["is-user-active"]).toBe(false);
  });
  it("should register a normal user", async () => {
    const newUser = {
      username: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const res = await request(server).post("/api/auth/register").send(newUser);
    expect(res.status).toBe(201);
    expect(res.body.data.attributes["is-super-user"]).toBe(false);
    expect(res.body.data.attributes["is-user-active"]).toBe(false);
  });
  it("should fail to resgister a normal user withot an email", async () => {
    const newUser = {
      username: faker.name.firstName(),
      password: faker.internet.password(),
    };

    const res = await request(server).post("/api/auth/register").send(newUser);
    expect(res.status).toBe(400);
    console.log(res.body);
    expect(res.body).toHaveProperty("errors");
  });
  it("should fail to resgister a normal user with invalid email", async () => {
    const newUser = {
      username: faker.name.firstName(),
      email: "testteste",
      password: faker.internet.password(),
    };

    const res = await request(server).post("/api/auth/register").send(newUser);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
  });
  it("should fail to resgister a normal user without username", async () => {
    const newUser = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const res = await request(server).post("/api/auth/register").send(newUser);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
  });
  it("should fail to resgister a normal user with password with less then 5 characters", async () => {
    const newUser = {
      username: faker.name.firstName(),
      email: faker.internet.email(),
      password: `1234`,
    };

    const res = await request(server).post("/api/auth/register").send(newUser);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
  });
  it("should fail to register a normal user that already have been registered", async () => {
    const newUser = {
      username: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    await request(server).post("/api/auth/register").send(newUser);
    const secondRes = await request(server)
      .post("/api/auth/register")
      .send(newUser);
    expect(secondRes.status).toBe(400);
    expect(secondRes.body).toHaveProperty("errors");
  });
});

describe("Login", () => {
  it("should recive a token on login", async () => {
    const password = "12345678";
    const user = await factory.create("User", {
      password,
    });
    const res = await request(server).post("/api/auth/login").send({
      email: user.email,
      password: password,
    });

    expect(res.body.data.attributes).toHaveProperty("token");
    expect(res.status).toBe(200);
  });
  it("should fail to login a user with incorrect password", async () => {
    const password = "12345678";
    const user = await factory.create("User", {
      password,
    });
    const res = await request(server).post("/api/auth/login").send({
      email: user.email,
      password: "1234566",
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
  });
  it("should fail to login a user without a password", async () => {
    const password = "12345678";
    const user = await factory.create("User", {
      password,
    });
    const res = await request(server).post("/api/auth/login").send({
      email: user.email,
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
  });
  it("should fail to login a user without a email", async () => {
    const password = "12345678";
    const user = await factory.create("User", {
      password,
    });
    const res = await request(server).post("/api/auth/login").send({
      password,
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
  });
  it("should fail to login a user with invalid email", async () => {
    const password = "12345678";
    const user = await factory.create("User", {
      password,
    });
    const res = await request(server)
      .post("/api/auth/login")
      .send({
        email: user.email + "sdds",
        password,
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
  });
});
