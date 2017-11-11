const port = process.env.PORT || 8081;
const endpoints = require('./endpoints');

const httpEndpoints = endpoints.filter(endpoint => endpoint.http);

const httpServer = require('./servers/http')(httpEndpoints);

httpServer.listen(port, () => {
  console.log(`HTTP SERVER => Listening at http://localhost:${port}`);
});
