const { getDatabaseInstance } = require('../db/cloudant/connection.js');

const searchUser = require('./search');

const activate = async cpf => {

  const doc = await searchUser(cpf);

  if (!doc) { return; }

  doc.status = 'active';

  try {
    const updateResult = await getDatabaseInstance()
      .insert(doc);

    if (updateResult.ok) {
      return { data: doc };
    }

    throw new Error('Not able to update');

  } catch (error) {
    console.log(error.message || error);
    throw new Error(`Error when activating user with cpf:${cpf}`)
  }
};


module.exports = activate;