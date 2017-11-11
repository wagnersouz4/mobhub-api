const { InvalidParamsException } = require('../../exceptions/validation');
const createUser = require('../../modules/users/create');

const activate = params => {
  const { cpf } = params;

  if (!cpf) { throw new InvalidParamsException(); }

  const result = await activateUser(cpf);

  if (!result) {
    console.log(`Not able to active the user with cpf: ${cpf}`);
    throw new Error('Error while activating the user');
  }

  return result;
};

module.exports = activate;