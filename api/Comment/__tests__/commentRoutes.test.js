process.env.TEST_SUITE = "comment-routes-test";
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
const { createChirp } = require("../../Chirp/service/create");

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

describe("Testing comment routes", () => {
  let server;
  let createdRequest;
  let token;
  let chirpUuid;

  beforeAll(async done => {
    server = await app.listen(2010);
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

  test("comment should get created", async done => {
    console.log("CHIRP UUID "+chirpUuid);
    const response = await postRequestWithHeaders(
      createdRequest,
      `/chirp/comment/`,
      token,
      {
          chirpUuid:chirpUuid,
          comment: "some more words"
      }
    );
    console.log(response.status);
    console.log(response.body)
    const { comment } = response.body.data;
    expect(comment).toBe("some more words");
    done();
  });
});
