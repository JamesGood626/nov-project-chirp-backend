process.env.TEST_SUITE = "chirp-test";
const app = require("../../../app");
const request = require("supertest");
const {
  putRequest,
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
const User = require("../../User/model/user");
const Chirp = require("../../Chirp/model/chirp");

const chirpInput = {
  username: "Sally",
  message: "some words"
};

const chirpInputTwo = {
  username: "Jim",
  message: "some more words"
};

const badChirpInput = {
  username: "Sally",
  message: ""
};

describe("Hitting the chirpRoutes, a User may", () => {
  let server;
  let createdRequest;

  beforeAll(async done => {
    server = await app.listen(2006);
    createdRequest = await request.agent(server);
    done();
  });

  beforeEach(async done => {
    await dropCollection(User);
    await dropCollection(Chirp);
    done();
  });

  afterAll(async done => {
    await server.close(done);
  });

  // test("create a chirp", () => {});
  test("user can create a chirp", async done => {
    const response = await postRequest(createdRequest, "/chirp", chirpInput);
    const parsed = parseJson(response.text);
    const { chirp } = parsed.data;
    expect(chirp.username).toBe("Sally");
    expect(chirp.message).toBe(chirpInput.message);
    done();
  });

  test("receive error message when given bad chirpInput for creating chirp.", async done => {
    const response = await postRequest(createdRequest, "/chirp", badChirpInput);
    console.log("bad chirp creation response: ", response.body);
    const { param, value, msg } = response.body.errors[0];
    expect(param).toBe("message");
    expect(value).toBe("");
    expect(msg).toBe("Chirp must be at least 10 characters.");
    // const parsed = parseJson(response.text);
    // const { chirp } = parsed.data;
    // expect(chirp.username).toBe("Sally");
    // expect(chirp.message).toBe(chirpInput.message);
    done();
  });

  test("user can get all chirps", async done => {
    await postRequest(createdRequest, "/chirp", chirpInput);
    await postRequest(createdRequest, "/chirp", chirpInputTwo);
    const response = await getRequest(createdRequest, "/chirp");
    const parsed = parseJson(response.text);
    expect(parsed.length).toBe(2);
    done();
  });

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
