process.env.TEST_SUITE = "chirp-test";
const app = require("../../../app");
const request = require("supertest");
const {
  putRequest,
  postRequest,
  getRequest,
  getRequestWithHeaders,
  postRequestWithHeaders,
  dropCollection,
  parseJson
} = require("../../testHelpers");
const {
  NO_CONTENT,
  UNPROCESSABLE_ENTITY,
  INTERNAL_SERVER_ERROR
} = require("../../StatusCodeConstants");
const User = require("../../User/model/user");
const Chirp = require("../../Chirp/model/chirp");

const chirpInput = {
  username: "Sally",
  message: "some words needs to be tenaaaaaaaa"
};

const chirpInputTwo = {
  username: "Jim",
  message: "some more words needs to be teaaaaan"
};

const badChirpInput = {
  username: "Sally",
  message: ""
};

// Temp
const userInput = {
  username: "Sally",
  email: "sally@gmail.com",
  password: "passwordaaa"
};

// Temp
const loginUserInput = {
  username: "Sally",
  password: "passwordaaa"
};

describe("Hitting the chirpRoutes, a User may", () => {
  let server;
  let createdRequest;
  let token;

  beforeAll(async done => {
    server = await app.listen(2006);
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
    done();
  });

  beforeEach(async done => {
    await dropCollection(Chirp);
    done();
  });

  afterAll(async done => {
    await dropCollection(User);
    await server.close(done);
  });

  // test("create a chirp", () => {});
  test("user can create a chirp", async done => {
    const response = await postRequestWithHeaders(
      createdRequest,
      "/chirp",
      token,
      chirpInput
    );
    console.log("THE RESPONSE BODY WE NEED: ", response.body.data.chirp);
    const { chirp } = response.body.data;
    // const parsed = parseJson(response.text);
    // const { chirp } = parsed.data;
    expect(chirp.username).toBe("Sally");
    expect(chirp.message).toBe(chirpInput.message);
    done();
  });

  test("receive error message when given bad chirpInput for creating chirp.", async done => {
    const response = await postRequestWithHeaders(
      createdRequest,
      "/chirp",
      token,
      badChirpInput
    );
    const { param, value, msg } = response.body.errors[0];
    expect(param).toBe("message");
    expect(value).toBe("");
    expect(msg).toBe("Chirp must be at least 10 characters.");
    done();
  });

  // test("user can get all chirps", async done => {
  //   await postRequestWithHeaders(createdRequest, "/chirp", chirpInput, token);
  //   await postRequestWithHeaders(
  //     createdRequest,
  //     "/chirp",
  //     token,
  //     chirpInputTwo
  //   );
  //   const response = await getRequestWithHeaders(
  //     createdRequest,
  //     "/chirp",
  //     token
  //   );
  //   const parsed = parseJson(response.text);
  //   expect(parsed.length).toBe(2);
  //   done();
  // });

  // test("user can get delete a chirp", async done => {
  //   const createdChirpResponse = await postRequest(
  //     createdRequest,
  //     "/chirp/delete",
  //     chirpInput
  //   );
  //   console.log(
  //     "created chirp resposne in delete chirp test: ",
  //     createdChirpResponse.body
  //   );
  //   // const { _id } = createdChirpResponse.body.data.chirp;
  //   // const response = await putRequest(createdRequest, `/chirp/delete/${_id}`);
  //   // expect(response.statusCode).toBe(NO_CONTENT);
  //   done();
  // });
});
