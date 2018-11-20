// app is the instantiated express app
// route should be a string i.e. "/chirp"
// input is an object literal
const getRequest = (app, route, input) => {
  request(app)
    .get(route)
    .send(input)
    .set("Accept", "application/json")
    .end(function(err, res) {
      if (err) throw err;
    });
};

const postRequest = (app, route, input) => {
  request(app)
    .post(route)
    .send(input)
    .set("Accept", "application/json")
    .end(function(err, res) {
      if (err) throw err;
    });
};

const putRequest = (app, route, input) => {
  request(app)
    .put(route)
    .send(input)
    .set("Accept", "application/json")
    .end(function(err, res) {
      if (err) throw err;
    });
};

module.exports = {
  getRequest: getRequest,
  postRequest: postRequest,
  putRequest: putRequest
};
