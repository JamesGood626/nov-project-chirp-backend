process.env.TEST_SUITE = "comment-routes-test";
const request = require("supertest");
const app = require("../../../app");
const {
  postRequest,
  getRequest,
  putRequest,
  getRequestWithHeaders,
  postRequestWithHeaders,
  putRequestWithHeaders,
  dropCollection,
  parseJson
} = require("../../testHelpers");
const { createUser } = require("../../User/service");
const { createChirp } = require("../../Chirp/service/create");
const { retrieveAllChirps } = require("../../Chirp/service/retrieve");
const  { getCommentsForChirp}  = require("../../Comment/service/retrieve");
const {Chirp} = require("../../Chirp/model/chirp");
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
    server = await app.listen(2018);
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
          chirpId:chirpUuid,
          comment: "some more words"
      }
    );
    
    const { comment } = response.body.data;
    expect(comment).toBe("some more words");
    done();
  });
  test("should retrieve comments for chirp", async done =>{
    const response =  await getRequestWithHeaders(createdRequest, `chirp/comment/${chirpUuid}`, token);
    //const {comments} = response.body.data;
    console.log(response.status);
    console.log("THE RETRIEVE COMMENTS FOR CHIRP RESPONSE BODY",  response.body);
    //expect().toBeGreaterThan(0);
    done();
  })
});
