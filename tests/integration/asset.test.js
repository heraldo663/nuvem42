// const request = require("supertest");
// const { Assets } = require("../../models");
// const { User } = require("../../models");
test("tobe implemented", () => {
  expect(true).toBe(true);
});
// let token;
// let bucketId;

// beforeAll(async () => {
//   server = require("../../app");

//   const tester = {
//     username: "Testert",
//     email: "testert@test.com",
//     password: "123456"
//   };

//   await request(server)
//     .post("/api/auth/register")
//     .send(tester);
//   delete tester.username;
//   const res = await request(server)
//     .post("/api/auth/login")
//     .send(tester);

//   token = res.body.token;

//   const newBucket = {
//     bucket: "test"
//   };
//   const resbucket = await request(server)
//     .post("/api/bucket")
//     .send(newBucket)
//     .set("Authorization", token);

//   bucketId = resbucket.body.id;
// });

// afterAll(() => {
//   Assets.destroy({ where: {} });
//   User.destroy({ where: {} });
// });

// describe("GET /api/bucket/:bucket_id/assets", () => {
//   it("should get an empty bucket", async () => {
//     const res = await request(server)
//       .get(`/api/bucket/${bucketId}/assets`)
//       .set("Authorization", token);

//     expect(res.status).toBe(200);
//     expect(res.body.length).toBe(0);
//   });
// });

// describe("POST /api/bucket/:bucket_id/assets", () => {
//   it("should save an asset", async () => {
//     const res = await request(server)
//       .post(`/api/bucket/${bucketId}/assets`)
//       .attach("file", "tests/fixtures/img1.jpg")
//       .set("Authorization", token)
//       .set("Content-Type", "application/x-www-form-urlencoded");

//     console.log(res.body);

//     expect(res.status).toBe(200);
//     expect(res.body).toHaveProperty("bucketId", bucketId);
//   });
// });

// describe("DELETE /api/bucket/:bucket_id/assets", () => {
//   it("should delete an asset", async () => {
//     const asset = await request(server)
//       .post(`/api/bucket/${bucketId}/assets`)
//       .attach("file", "tests/fixtures/img1.jpg")
//       .set("Authorization", token)
//       .set("Content-Type", "application/x-www-form-urlencoded");

//     console.log(asset.body);
//     const res = await request(server)
//       .delete(`/api/bucket/${bucketId}/assets/${asset.body.id}`)
//       .set("Authorization", token)
//       .set("Content-Type", "application/json");

//     expect(res.status).toBe(200);
//     expect(res.body).toHaveProperty("success", true);
//   });
// });
