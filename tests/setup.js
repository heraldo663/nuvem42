const supertest = require("supertest");
const app = require("../app");
let server;

beforeAll(async done => {
  server = app.listen(done);
  request = supertest.agent(server);
});
afterAll(async done => {
  server.close(done);
});
