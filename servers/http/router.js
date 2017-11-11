const express = require('express');
const router = express.Router();
const cacheMiddleware = require('../../middlewares/cache')();
const { InvalidParamsException } = require('../../exceptions/validation');

const handleRequest = async ({ input, res, method }) => {
  try {
    const result = await method(input);
    if (!result) {
      res.status(404);
      return;
    }

    res.json(result);
  } catch (error) {
    if (error instanceof InvalidParamsException) {
      console.log(error.description);
      res.status(400);
      res.json({ error: 'bad_request' });
      return;
    }

    console.log(error);
    res.status(500);
    res.json({ error: 'internal_server_error' });
  }
};

const createRoute = endpoint => {
  const { route, http } = endpoint;

  // As delete is a special world in javascript let's we are using deleteHttp instead.
  // Notice that at the moment we are strictly working just with get and post verbs, so no further implementation was done.
  const { get, post, notUseCache } = http;

  if (get) {
    const getHandler = (req, res) => {
      return handleRequest({
        // keep in mind that if any parameter named session, it will be overwritten.
        input: Object.assign({}, req.query, req.params, { session: req.user }),
        res,
        method: get
      });
    };

    if (notUseCache) {
      router.get(route, getHandler);
      return;
    }

    router.get(route, cacheMiddleware, getHandler);
  }

  if (post) {
    const getHandler = (req, res) =>
      handleRequest({
        input: Object.assign({}, req.body, { session: req.user }),
        res,
        method: post
      });
    router.post(route, getHandler);
  }
};

module.exports = {
  initializeUsing: endpoints => endpoints.forEach(createRoute),
  get: () => router
};
