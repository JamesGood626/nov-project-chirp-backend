// app is the instantiated express app
// route should be a string i.e. "/chirp"
// input is an object literal
const getRequest = async (app, route, input) => {
  const response = await app.post(route).send(input);
  return response;
};

const postRequest = async (app, route, input) => {
  const response = await app.post(route).send(input);
  return response;
};

const putRequest = async (app, route, input) => {
  const response = await app.post(route).send(input);
  return response;
};

module.exports = {
  getRequest: getRequest,
  postRequest: postRequest,
  putRequest: putRequest
};
