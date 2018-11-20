process.env.TEST_SUITE = "chirp-test";
const app = require("../../../app");
const request = require("supertest");
const {
  postRequest,
  getRequest,
  dropCollection,
  parseJson
} = require("../../testHelpers");

const userInput = {
  message: "some words",
  username: "test username"
};

describe("Hitting the chirpRoutes, a User may", () => {
  let server;
  let createdRequest;

  beforeAll(async done => {
    server = await app.listen(2001);
    createdRequest = await request.agent(server);
    done();
  });

  // test("create a chirp", () => {});
  test("user can create a chirp", async done => {
    const response = await postRequest(createdRequest, "/chirp", userInput);
    const parsed = parseJson(response.text, true);
    expect(parsed.username).toBe("test username");
    done();
  });

  test("user can get all chirps", async done => {
    const response = await getRequest(createdRequest, "/chirp");
    const parsed = parseJson(response.text, true);
    expect(parsed.length).toBeGreaterThan(0);
    done();
  });
});
