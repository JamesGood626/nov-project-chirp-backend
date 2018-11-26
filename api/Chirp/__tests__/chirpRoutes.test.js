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
  INTERNAL_SERVER_ERROR
} = require("../../StatusCodeConstants");

const chirpInput = {
  username: "Sally",
  message: "some words"
};

//should fail to delete
const badChirpInput = {
  chirp: {
    message: "some words",
    username: "Sally"
  },
  user: {
    username: "Bill"
  }
};

describe("Hitting the chirpRoutes, a User may", () => {
  let server;
  let createdRequest;

  beforeAll(async done => {
    server = await app.listen(2006);
    createdRequest = await request.agent(server);
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

  test("user can get all chirps", async done => {
    const response = await getRequest(createdRequest, "/chirp");
    const parsed = parseJson(response.text);
    expect(parsed.length).toBeGreaterThan(0);
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
