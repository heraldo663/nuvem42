require("../setup");
let token;

beforeAll(async () => {
  const tester = {
    username: "Tester",
    email: "tester@test.com",
    password: "123456"
  };

  await request.post("/api/auth/register").send(tester);
  delete tester.username;
  const res = await request.post("/api/auth/login").send(tester);

  token = res.body.token;
});

describe("GET api/buckets", () => {
  it("should get all user buckets", async () => {
    const res = await request.get("/api/bucket").set("Authorization", token);

    expect(res.status).toBe(200);
  });
});
