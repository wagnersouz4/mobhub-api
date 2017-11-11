const { getDatabaseInstance } = require('../db/cloudant/connection.js');
const { designDocument, indexName } = require('../../config');


const search = async cpf => {
  const params = {
    q: `cpf:"${cpf}"`,
    include_docs: true,
    limit: 1
  };

  try {
    const result = await getDatabaseInstance()
      .search(designDocument, indexName, params);

    if (result && result.total_rows === 1) {
      const { doc } = result.rows[0];
      return doc;
    }
    return;
  } catch (error) {
    console.log(error.message || error);
    return;
  }
};

module.exports = search;