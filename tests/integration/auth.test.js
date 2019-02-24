require("dotenv").config();
const supertest = require("supertest");
const faker = require("faker");
const { User } = require("./../../models");
const app = require("../../app");

const request = supertest(app);

describe("login", () => {
  it("should login as an admin user", async done => {
    const res = await request.post("/api/auth/login").send({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD
    });

    expect(res.status).toBe(200);

    done();
  });
  it("should fail to login a user", async done => {
    const user = {
      email: "test@test.com",
      password: "123456",
      username: "tester"
    };

    await request.post("/api/auth/register").send(user);
    delete user.username;

    const res = await request.post("/api/auth/login").send(user);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("success", false);
    done();
  });
});

describe("register", () => {
  it("should register a user", async done => {
    const newUser = {
      username: faker.name.firstName(),
      email: faker.internet.email()
    };

    const res = await request.post("/api/auth/login").send({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD
    });
    expect(res.status).toBe(200);

    const res1 = await request
      .post("/api/auth/register")
      .set("Authorization", res.body.token)
      .send(newUser);

    expect(res1.status).toBe(201);
    done();
  });
});
