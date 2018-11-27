process.env.TEST_SUITE = "reaction-routes-test";
const request = require("supertest");
const app = require("../../../app");
const {
  postRequest,
  getRequest,
  putRequest,
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
  message: "Hello I'm Jim."
};

describe("Testing reaction routes", () => {
  let server;
  let createdRequest;

  beforeAll(async done => {
    server = await app.listen(2004);
    createdRequest = await request.agent(server);
    done();
  });

  afterAll(async done => {
    await server.close(done);
  });

  test("chirp likes should increment", async done => {
    const { uuid: userUuid } = await createUser(userInput);
    const { uuid: chirpUuid } = await createChirp(chirpInput);
    const likeInput = {
      userUuid,
      chirpUuid
    };
    const response = await putRequest(createdRequest, `/chirp/like`, likeInput);
    const { likeCount } = response.body.data;
    expect(likeCount).toBe(1);
    done();
  });

  test("chirp hates should increment", async done => {
    const { uuid: userUuid } = await createUser(userInput);
    const { uuid: chirpUuid } = await createChirp(chirpInput);
    const hateInput = {
      userUuid,
      chirpUuid
    };
    const response = await putRequest(createdRequest, `/chirp/hate`, hateInput);
    const { hateCount } = response.body.data;
    expect(hateCount).toBe(1);
    done();
  });

  test("chirp favorites should increment", async done => {
    const { uuid: userUuid } = await createUser(userInput);
    const { uuid: chirpUuid } = await createChirp(chirpInput);
    const favoriteInput = {
      userUuid,
      chirpUuid
    };
    const response = await putRequest(
      createdRequest,
      `/chirp/favorite`,
      favoriteInput
    );
    const { favoriteCount } = response.body.data;
    expect(favoriteCount).toBe(1);
    done();
  });
});
