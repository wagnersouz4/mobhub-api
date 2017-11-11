const { InvalidParamsException } = require('../../exceptions/validation');
const activateUser = require('../../modules/users/activate');

const activate = async params => {
  const { cpf } = params;

  if (!cpf) { throw new InvalidParamsException(); }

  try {
    const result = await activateUser(cpf);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error('Error while activating the user');
  }

};

module.exports = activate;