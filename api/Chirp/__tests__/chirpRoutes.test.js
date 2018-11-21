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

//will change to uuids
const chirpInput = {
  chirp: {
    message: "some words",
    username: "Sally"
  },
  user: {
    username: "Sally"
  }
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
    server = await app.listen(2001);
    createdRequest = await request.agent(server);
    done();
  });

  // test("create a chirp", () => {});
  test("user can create a chirp", async done => {
    const response = await postRequest(createdRequest, "/chirp", chirpInput);
    const parsed = parseJson(response.text);
    console.log("THIS IS PARSED: ", parsed);
    const { chirp } = parsed.data;
    expect(chirp.username).toBe("Sally");
    done();
  });

  test("user can get all chirps", async done => {
    const response = await getRequest(createdRequest, "/chirp");
    const parsed = parseJson(response.text);
    expect(parsed.length).toBeGreaterThan(0);
    done();
  });

  test("user can get delete a chirp", async done => {
    const createdChirpResponse = await postRequest(
      createdRequest,
      "/chirp/delete",
      chirpInput
    );
  });

    const { _id } = createdChirpResponse.body.data.chirp;
    const response = await putRequest(createdRequest, `/chirp/delete/${_id}`);
    expect(response.statusCode).toBe(NO_CONTENT);
    done();
  });
});
