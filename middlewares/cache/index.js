const mcache = require('memory-cache');

// Cache
const DEFAULT_TTL = 1000 * 3600 * 60; // ttl in ms

/**
  * @function cache
  * @description Uses memory-cache to cache a response with a given ttl if the key is not present, or serving from the memory otherwise.
  * @param {Number} ttl Time in milliseconds.
  * @returns {Array} Array of contexts
  */
const cache = (ttl = DEFAULT_TTL) => {
  return (req, res, next) => {
    //eslint-disable-line
    const key = `__express__ + ${req.originalUrl || req.url}`;
    const cachedResponse = mcache.get(key);

    if (cachedResponse) {
      const { statusCode, body } = cachedResponse;
      res.status(statusCode);
      res.send(body);
      return;
    }

    res.sendResponse = res.send;
    res.send = body => {
      const cachedResult = {
        body,
        statusCode: res.statusCode
      };
      mcache.put(key, cachedResult, ttl);
      res.sendResponse(body);
    };

    next();
  };
};

module.exports = cache;
