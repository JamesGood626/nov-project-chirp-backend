process.env.TEST_SUITE = "user-routes-test";
const app = require("../../../app");
const request = require("supertest");
const { postRequest } = require("../../testHelpers");

describe("Hitting the userRoutes, a User may", () => {
  let server;
  let createdRequest;

  beforeAll(async done => {
    server = await app.listen(2000);
    createdRequest = await request.agent(server);
    done();
  });

  afterAll(async done => {
    await server.close(done);
  });

  test("create a user", async done => {
    const userInput = {
      username: "test username",
      email: "email"
    };
    const response = await postRequest(createdRequest, "/user", userInput);
    const parsed = JSON.parse(response.text);
    expect(parsed.username).toBe("Failed");
    done();
  });
});
