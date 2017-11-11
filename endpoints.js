const activateUser = require('./helpers/users/activate');

const endpoints = [
  {
    route: '/user/activate',
    http: {
      post: activateUser,
      notUseCache: true
    }
  },
];

module.exports = endpoints;
