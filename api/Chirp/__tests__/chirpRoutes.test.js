process.env.TEST_SUITE = "chirp-test";
const app = require("../../../app");
const { postRequest } = require("../../testHelpers");

describe("Hitting the chirpRoutes, a User may", () => {
  // test("create a chirp", () => {});
  test("1+1 = 2", () => {
    expect(1 + 1).toBe(2);
  });
});
