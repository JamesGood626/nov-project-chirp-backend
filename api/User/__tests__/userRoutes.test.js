process.env.TEST_SUITE = "user-routes-test";
const app = require("../../../app");
const request = require("supertest");
const User = require("../model/user");
const { createUser, loginUser } = require("../service");
const {
  postRequest,
  getRequest,
  dropCollection,
  parseJson
} = require("../../testHelpers");
const {
  NO_CONTENT,
  UNPROCESSABLE_ENTITY,
  INTERNAL_SERVER_ERROR
} = require("../../StatusCodeConstants");

const userInput = {
  username: "Sally",
  email: "sally@gmail.com",
  password: "passwordaaa"
};

const loginUserInput = {
  username: "Sally",
  password: "passwordaaa"
};

const badLoginUserInput = {
  username: "Sally",
  password: "passworddwadawd"
};

const badUserInput = {
  username: "Sally",
  email: "sally@gmail.com!67ttg76"
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

  test("login a user", async done => {
    await postRequest(createdRequest, "/user", userInput);
    const response = await postRequest(
      createdRequest,
      "/user/login",
      loginUserInput
    );
    console.log("THE FAILED LOGIN RESP BODY: ", response.body);
    expect(response.body.token.length).toBe(240);
    done();
  });

  test("receive a message indicating bad login attempt", async done => {
    await postRequest(createdRequest, "/user", userInput);
    const response = await postRequest(
      createdRequest,
      "/user/login",
      badLoginUserInput
    );
    expect(response.body.message).toBe("Incorrect username or password.");
    done();
  });

  test("receive error message from bad user input when creating a user.", async done => {
    const response = await postRequest(createdRequest, "/user", badUserInput);
    const { param, msg, value } = response.body.errors[0];
    expect(response.status).toBe(UNPROCESSABLE_ENTITY);
    expect(param).toBe("email");
    expect(msg).toBe("Invalid value");
    expect(value).toBe(badUserInput.email);
    done();
  });

  test("get all users", async done => {
    await createUser(userInput);
    const response = await getRequest(createdRequest, "/user/all-users");
    const parsed = parseJson(response.text);
    expect(parsed.length).toEqual(1);
    done();
  });
});
