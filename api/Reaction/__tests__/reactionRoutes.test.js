//process.env.TEST_SUITE = "reaction-routes-test";
const request = require("supertest");
const app = require("../../../app");
const {
  postRequest,
  getRequest,
  putRequest,
  postRequestWithHeaders,
  putRequestWithHeaders,
  dropCollection,
  parseJson
} = require("../../testHelpers");
const { createUser } = require("../../User/service");
const { createChirp } = require("../../Chirp/service");

const userInput = {
  username: "Sally",
  email: "sally@gmail.com",
  password: "passwordaaa"
};
const chirpInput = {
  username: "Jim",
  message: "Hello I'm Jim and here's 10 characters."
};

// Temp
const loginUserInput = {
  username: "Sally",
  password: "passwordaaa"
};

describe("Testing reaction routes", () => {
  let server;
  let createdRequest;
  let token;
  let chirpUuid;

  beforeAll(async done => {
    server = await app.listen(2004);
    createdRequest = await request.agent(server);
    // create user
    await postRequest(createdRequest, "/user", userInput);
    // login user
    const response = await postRequest(
      createdRequest,
      "/user/login",
      loginUserInput
    );
    token = response.body.token;
    const chirpResp = await postRequestWithHeaders(
      createdRequest,
      "/chirp",
      token,
      chirpInput
    );
    chirpUuid = chirpResp.body.data.chirp.uuid;
    done();
  });

  afterAll(async done => {
    await server.close(done);
  });

  test("chirp likes should increment", async done => {
    const response = await putRequestWithHeaders(
      createdRequest,
      `/chirp/reaction/like/${chirpUuid}`,
      token
    );
    const { likesCount } = response.body.data;
    expect(likesCount).toBe(1);
    done();
  });

  test("chirp hates should increment", async done => {
    const response = await putRequestWithHeaders(
      createdRequest,
      `/chirp/reaction/hate/${chirpUuid}`,
      token
    );
    const { hatesCount } = response.body.data;
    expect(hatesCount).toBe(1);
    done();
  });

  test("chirp favorites should increment", async done => {
    const response = await putRequestWithHeaders(
      createdRequest,
      `/chirp/reaction/favorite/${chirpUuid}`,
      token
    );
    const { favoritesCount } = response.body.data;
    expect(favoritesCount).toBe(1);
    done();
  });
});
