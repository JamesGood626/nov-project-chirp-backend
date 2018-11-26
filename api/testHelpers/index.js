// app is the instantiated express app
// route should be a string i.e. "/chirp"
// input is an object literal
const getRequest = async (app, route) => {
  const response = await app.get(route);
  return response;
};

const postRequest = async (app, route, input) => {
  const response = await app.post(route).send(input);
  return response;
};

const putRequest = async (app, route, input) => {
  const response = await app.put(route).send(input);
  console.log("PUT REQUEST RESPONSE: ", response.body);
  return response;
};

const dropCollection = async Model => {
  await Model.deleteMany({}, err => {
    if (err !== null) {
      console.log(`${Model} Collection Drop Error: `, err);
    }
  });
};

const parseJson = (string, debug = false) => {
  if (debug) {
    console.log("The passed in string: ", string);
  }
  const parsed = JSON.parse(string);
  if (debug) {
    console.log("The parsed JSON: ", parsed);
  }
  return parsed;
};

module.exports = {
  getRequest: getRequest,
  postRequest: postRequest,
  putRequest: putRequest,
  dropCollection: dropCollection,
  parseJson: parseJson
};
