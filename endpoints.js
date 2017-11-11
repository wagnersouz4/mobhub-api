const activateUser = require('./helper/users/activate');

const endpoints = [
  {
    route: '/user/activate',
    http: { post: activateUser }
  },
];

module.exports = endpoints;
