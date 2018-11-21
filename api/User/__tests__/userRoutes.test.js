process.env.TEST_SUITE = "user-routes-test";
const app = require("../../../app");
const request = require("supertest");
const User = require("../model/user");
const { createUser } = require("../service");
const {
  postRequest,
  getRequest,
  dropCollection,
  parseJson
} = require("../../testHelpers");

const userInput = {
  username: "Sally",
  email: "email"
};

describe("Hitting the userRoutes, a User may", () => {
  let server;
  let createdRequest;

  beforeAll(async done => {
    server = await app.listen(2000);
    createdRequest = await request.agent(server);
    done();
  });

  beforeEach(async done => {
    await dropCollection(User);
    done();
  });

  afterAll(async done => {
    await server.close(done);
  });

  test("create a user", async done => {
    const response = await postRequest(createdRequest, "/user", userInput);
    const parsed = parseJson(response.text);
    expect(parsed.username).toBe("Sally");
    done();
  });

  test("get all users", async done => {
    await createUser(userInput);
    const response = await getRequest(createdRequest, "/users");
    const parsed = parseJson(response.text);
    expect(parsed.length).toEqual(1);
    done();
  });
});
