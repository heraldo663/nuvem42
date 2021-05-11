/* eslint-disable no-undef */
const request = require("supertest");
const { Bucket } = require("../../src/app/models");
const server = require("../../src/app");
let token;
const tester = {
  username: "Tester",
  email: "tester@teste.com",
  password: "123456abc",
  id: "",
};

beforeAll(async (done) => {
  await request(server).post("/api/auth/register").send(tester);

  delete tester.username;
  const res = await request(server).post("/api/auth/login").send(tester);

  tester.id = res.body.id;
  token = res.body.token;
  done();
});

describe("GET api/buckets", () => {
  it("should get an empty array", async () => {
    const res = await request(server)
      .get("/api/bucket")
      .set("Authorization", token);

    expect(res.status).toBe(200);
    expect(res.body.buckets.length).toBeGreaterThanOrEqual(3);
  });

  it("should get some buckets", async () => {
    const root = await Bucket.findOne({
      where: {
        userId: tester.id,
        bucket: "root",
        rootBucketId: null,
      },
    });
    await Bucket.bulkCreate([
      { bucket: "abc123", rootBucketId: root.id, userId: tester.id },
      { bucket: "name too long", rootBucketId: root.id, userId: tester.id },
      { bucket: "testeee", rootBucketId: root.id, userId: tester.id },
    ]);

    const res = await request(server)
      .get("/api/bucket")
      .set("Authorization", token);

    expect(res.status).toBe(200);
    expect(res.body.buckets.length).toBeGreaterThanOrEqual(5);
  });
});

describe("GET /api/bucket/:id", () => {
  it("should get an bucket", async () => {
    const newBucket = {
      bucket: "test",
    };
    const createdBucket = await Bucket.create({
      ...newBucket,
      userId: tester.id,
    });

    const bucket = await request(server)
      .get(`/api/bucket/${createdBucket.id}`)
      .set("Authorization", token);

    expect(bucket.status).toBe(200);
    expect(bucket.body).toHaveProperty("bucket", newBucket.name);
  });
});

describe("POST api/buckets", () => {
  it("should add a bucket", async () => {
    const newBucket = {
      bucket: "test",
    };
    const res = await request(server)
      .post("/api/bucket")
      .send(newBucket)
      .set("Authorization", token);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("bucket", newBucket.bucket);
  });
  it("should fail a bucket due unauthorized user", async () => {
    const newBucket = { bucket: "test" };
    const res = await request(server).post("/api/bucket").send(newBucket);

    expect(res.status).toBe(401);
  });
  it("should fail a bucket due empty bucket", async () => {
    const newBucket = { bucket: "" };
    const res = await request(server)
      .post("/api/bucket")
      .send(newBucket)
      .set("Authorization", token);

    expect(res.status).toBe(400);
  });
});

describe("PATCH /api/bucket/:id", () => {
  it("should update an bucket", async () => {
    const newBucket = {
      bucket: "test",
    };
    const createdBucket = await Bucket.create({
      ...newBucket,
      userId: tester.id,
    });

    const bucket = await request(server)
      .patch(`/api/bucket/${createdBucket.id}`)
      .send({ bucket: "test1" })
      .set("Authorization", token);

    expect(bucket.status).toBe(200);
    expect(bucket.body).toHaveProperty("bucket", "test1");
  });
});

describe("DELETE /api/bucket/:id", () => {
  it("should delete an bucket", async () => {
    const newBucket = {
      bucket: "test",
    };
    const createdBucket = await Bucket.create({
      ...newBucket,
      userId: tester.id,
    });

    const bucket = await request(server)
      .delete(`/api/bucket/${createdBucket.id}`)
      .set("Authorization", token);

    expect(bucket.status).toBe(200);
    expect(bucket.body).toHaveProperty("success", true);
  });
});
