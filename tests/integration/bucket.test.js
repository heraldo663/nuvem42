require("dotenv").config();
const supertest = require("supertest");
const { Bucket } = require("../../models");
const { User } = require("../../models");
const app = require("../../app");

const request = supertest(app);

let token;

beforeAll(async () => {
  const res = await request.post("/api/auth/login").send({
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD
  });

  token = res.body.token;
});

afterAll(() => {
  Bucket.destroy({ where: {} });
});

describe("GET api/buckets", () => {
  it("should get base 3 buckets", async done => {
    const res = await request.get("/api/bucket/").set("Authorization", token);

    console.log(res.body);
    console.log(res.status);
    expect(res.status).toBe(200);
    expect(typeof res.body).toBe("object");

    done();
  });
  it("should get an 3 buckets", async () => {
    await request
      .post("/api/bucket")
      .send({ bucket: "test3" })
      .set("Authorization", token);
    await request
      .post("/api/bucket")
      .send({ bucket: "test2" })
      .set("Authorization", token);
    await request
      .post("/api/bucket")
      .send({ bucket: "test1" })
      .set("Authorization", token);

    const res = await request.get("/api/bucket/").set("Authorization", token);

    expect(res.status).toBe(200);
    console.log(res.body);
    expect(res.body.length).toBeGreaterThanOrEqual(3);
  });
});

// describe("GET /api/bucket/:id", () => {
//   it("should get an bucket", async () => {
//     const newBucket = {
//       bucket: "test"
//     };
//     const res = await request
//       .post("/api/bucket")
//       .send(newBucket)
//       .set("Authorization", token);

//     const bucket = await request
//       .get(`/api/bucket/${res.body.id}`)
//       .set("Authorization", token);

//     expect(bucket.status).toBe(200);
//     expect(bucket.body).toHaveProperty("bucket", newBucket.name);
//   });
// });

// describe("POST api/buckets", () => {
//   it("should add a bucket", async () => {
//     const newBucket = {
//       bucket: "test"
//     };
//     const res = await request
//       .post("/api/bucket")
//       .send(newBucket)
//       .set("Authorization", token);

//     expect(res.status).toBe(200);
//     expect(res.body).toHaveProperty("bucket", newBucket.bucket);
//   });
//   it("should fail a bucket due unauthorized user", async () => {
//     const newBucket = { bucket: "test" };
//     const res = await request.post("/api/bucket").send(newBucket);

//     expect(res.status).toBe(401);
//   });
//   it("should fail a bucket due empty bucket", async () => {
//     const newBucket = { bucket: "" };
//     const res = await request
//       .post("/api/bucket")
//       .send(newBucket)
//       .set("Authorization", token);

//     expect(res.status).toBe(400);
//   });
// });

// describe("PATCH /api/bucket/:id", () => {
//   it("should get an bucket", async () => {
//     const newBucket = {
//       bucket: "test"
//     };
//     const res = await request
//       .post("/api/bucket")
//       .send(newBucket)
//       .set("Authorization", token);

//     const bucket = await request
//       .patch(`/api/bucket/${res.body.id}`)
//       .send({ bucket: "test1" })
//       .set("Authorization", token);

//     expect(bucket.status).toBe(200);
//     expect(bucket.body).toHaveProperty("bucket", "test1");
//   });
// });

// describe("DELETE /api/bucket/:id", () => {
//   it("should get an bucket", async () => {
//     const newBucket = {
//       bucket: "test"
//     };
//     const res = await request
//       .post("/api/bucket")
//       .send(newBucket)
//       .set("Authorization", token);

//     const bucket = await request
//       .delete(`/api/bucket/${res.body.id}`)
//       .set("Authorization", token);

//     expect(bucket.status).toBe(200);
//     expect(bucket.body).toHaveProperty("success", true);
//   });
// });
