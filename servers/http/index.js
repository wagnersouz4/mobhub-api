const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const shouldCompress = (req, res) => {
  if (req.headers['x-no-compression']) {
    return false;
  }
  return compression.filter(req, res);
};

const addApiHandlingTo = ({ app, endpoints }) => {
  const router = require('./router');
  router.initializeUsing(endpoints);
  app.use('/api/v1', router.get());
};

const http = apiEndpoints => {
  const app = express();

  app.use(bodyParser.json());
  app.use(cors());
  app.use(require('helmet')());
  app.use(compression({ filter: shouldCompress }));

  // Handling apis request
  addApiHandlingTo({
    app,
    endpoints: apiEndpoints
  });

  return app;
};

module.exports = http;
