require('dotenv').config();

const config = {
  host: process.env.CLOUDANT_HOSTNAME,
  account: process.env.CLOUDANT_USERNAME,
  password: process.env.CLOUDANT_PASSWORD,
  dataDbName: process.env.CLOUDANT_DATA_DB_NAME,
  designDocument: process.env.CLOUDANT_DESIGN,
  indexName: process.env.CLOUDANT_SEARCH
};

module.exports = config;
