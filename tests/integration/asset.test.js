/* eslint-disable no-undef */
const request = require("supertest");
const server = require("../../src/app");
const fs = require("fs-extra");

let token;
const tester = {
  username: "Tester",
  email: "tester@teste.com",
  password: "123456abc",
  id: "",
};

let bucketId;

beforeAll(async () => {
  await request(server).post("/api/auth/register").send(tester);
  delete tester.username;
  const res = await request(server).post("/api/auth/login").send(tester);

  token = res.body.token;

  const newBucket = {
    bucket: "test",
  };
  const resbucket = await request(server)
    .post("/api/bucket")
    .send(newBucket)
    .set("Authorization", token);

  bucketId = resbucket.body.id;
});

afterAll(async () => {
  fs.remove(process.env.MEDIA_ROOT, (err) => console.log(err));
});

describe("GET /api/bucket/:bucket_id/assets", () => {
  it("should get an empty bucket", async () => {
    const res = await request(server)
      .get(`/api/bucket/${bucketId}/assets`)
      .set("Authorization", token);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(0);
  });
});

describe("POST /api/bucket/:bucket_id/assets", () => {
  it("should save an asset", async () => {
    const res = await request(server)
      .post(`/api/bucket/${bucketId}/assets`)
      .attach("file", "tests/fixtures/img1.jpg")
      .set("Authorization", token)
      .set("Content-Type", "application/x-www-form-urlencoded");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("bucketId", bucketId);
  });
});

describe("DELETE /api/bucket/:bucket_id/assets", () => {
  it("should delete an asset", async () => {
    const asset = await request(server)
      .post(`/api/bucket/${bucketId}/assets`)
      .attach("file", "tests/fixtures/img1.jpg")
      .set("Authorization", token)
      .set("Content-Type", "application/x-www-form-urlencoded");

    const res = await request(server)
      .delete(`/api/bucket/${bucketId}/assets/${asset.body.id}`)
      .set("Authorization", token)
      .set("Content-Type", "application/json");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("success", true);
  });
});
