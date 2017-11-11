const { isValidObject } = require('../../../../utils');
const isString = value => typeof value === 'string';

const parse = query => {
  if (!isValidObject(query)) {
    return;
  }

  const { entitiesList } = query;

  const queryCopy = Object.assign({}, query);

  const notSplittableProps = [
    'startDate',
    'endDate',
    'counts',
    'limit',
    'include_docs',
    'sort',
    'bookmark'
  ];

  const splittableProperties = Object.keys(query)
    .filter(prop => !notSplittableProps.includes(prop))
    .filter(prop => isString(query[prop]));

  splittableProperties.forEach(property => {
    queryCopy[property] = query[property].split(',');
  });

  return queryCopy;
};

module.exports = { parse };
