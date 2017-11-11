const cloudant = require('cloudant');
const config = require('../../../config');

// The connection will be a singleton to improve performance
let conn;
let dataDb;

/**
  * @function connect
  * @description Connects to the Cloudant.
  */
const connect = () => {
  if (!conn) {
    const params = {
      host: config.host,
      account: config.account,
      password: config.password,
      plugin: 'promises'
    };
    conn = cloudant(params);
  }
};

/**
  * @function dbInstanceWithType
  * @description Returns a Cloudant's database instance.
  * @param {String} dbAlias Database alias.
  * @returns {Object} Cloudant's database instance.
  */
const getDatabaseInstance = () => {
  connect();
  if (!dataDb) {
    dataDb = conn.use(config.dataDbName);
  }
  return dataDb;
};

module.exports = { getDatabaseInstance };
