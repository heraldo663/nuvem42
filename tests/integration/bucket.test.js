// const request = require("supertest");
// const { Bucket } = require("../../models");
// let token;

test("tobe implemented", () => {
  expect(true).toBe(true);
});
// beforeAll(async () => {
//   // init the server and create a user and store the token
//   server = require("../../app");

//   const tester = {
//     username: "Tester",
//     email: "tester@test.com",
//     password: "123456"
//   };
//   await request(server)
//     .post("/api/auth/register")
//     .send(tester);
//   delete tester.username;
//   const res = await request(server)
//     .post("/api/auth/login")
//     .send(tester);
//   console.log(res.body);
//   token = res.body.token;
// });

// afterAll(() => {
//   Bucket.destroy({ where: {} });
// });

// describe("GET api/buckets", () => {
//   it("should get an empty array", async () => {
//     const res = await request(server)
//       .get("/api/bucket")
//       .set("Authorization", token);

//     expect(res.status).toBe(200);
//     expect(typeof res.body).toBe("object");
//   });
//   it("should get an 3 buckets", async () => {
//     await request(server)
//       .post("/api/bucket")
//       .send({ bucket: "test3" })
//       .set("Authorization", token);
//     await request(server)
//       .post("/api/bucket")
//       .send({ bucket: "test2" })
//       .set("Authorization", token);
//     await request(server)
//       .post("/api/bucket")
//       .send({ bucket: "test1" })
//       .set("Authorization", token);

//     const res = await request(server)
//       .get("/api/bucket")
//       .set("Authorization", token);

//     expect(res.status).toBe(200);
//     expect(res.body.length).toBeGreaterThanOrEqual(3);
//   });
// });

// describe("GET /api/bucket/:id", () => {
//   it("should get an bucket", async () => {
//     const newBucket = {
//       bucket: "test"
//     };
//     const res = await request(server)
//       .post("/api/bucket")
//       .send(newBucket)
//       .set("Authorization", token);

//     const bucket = await request(server)
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
//     const res = await request(server)
//       .post("/api/bucket")
//       .send(newBucket)
//       .set("Authorization", token);

//     expect(res.status).toBe(200);
//     expect(res.body).toHaveProperty("bucket", newBucket.bucket);
//   });
//   it("should fail a bucket due unauthorized user", async () => {
//     const newBucket = { bucket: "test" };
//     const res = await request(server)
//       .post("/api/bucket")
//       .send(newBucket);

//     expect(res.status).toBe(401);
//   });
//   it("should fail a bucket due empty bucket", async () => {
//     const newBucket = { bucket: "" };
//     const res = await request(server)
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
//     const res = await request(server)
//       .post("/api/bucket")
//       .send(newBucket)
//       .set("Authorization", token);

//     const bucket = await request(server)
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
//     const res = await request(server)
//       .post("/api/bucket")
//       .send(newBucket)
//       .set("Authorization", token);

//     const bucket = await request(server)
//       .delete(`/api/bucket/${res.body.id}`)
//       .set("Authorization", token);

//     expect(bucket.status).toBe(200);
//     expect(bucket.body).toHaveProperty("success", true);
//   });
// });
