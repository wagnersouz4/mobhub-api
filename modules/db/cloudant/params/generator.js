const { isValidObject } = require('../../../../utils');

/**
* @function isValidParam
* @description Verify if a given param is valid.
* @param {Any} param The param element.
* @returns {Boolean} True if is valid and not otherwise.
*/
const isValidParam = param => {
  if (!param) {
    return false;
  }

  const filteredParam = param.filter(p => p);
  const isValid = filteredParam.length > 0;
  return isValid;
};

/**
 * @function createQueryString
 * @param {Array} array Array containing values to generate the query string from.
 * @param {String} separator Separator to be used between the array string values.
 * @returns {String} The query string.
 */
const createQueryStringFrom = (array, separator) => {
  return array.toString().replace(/,/g, `" ${separator} "`);
};

const joinClauseForQuery = q => {
  if (q === '') {
    return;
  }
  return 'AND';
};

const generateQuery = ({ q, valuesList, field, operator }) => {
  const joinClause = joinClauseForQuery(q);
  const createdQuery = createQueryStringFrom(valuesList, operator);
  const queryString = `${field}:("${createdQuery}")`;

  if (joinClause) {
    return ` ${joinClause} ${queryString} `;
  }
  return ` ${queryString} `;
};

/**
* @function generate
* @description Mounts a param object to be used in the Cloudant's query.
* @param {Object} query Query to seed the params creation.
* @returns {Object} Object to be used in a Cloudant's query.
*/
const generate = async query => {
  if (!isValidObject(query)) {
    return;
  }

  const {
    counts,
    sentimentList,
    buList,
    locationCodeList,
    typeList,
    include_docs,
    limit,
    bookmark,
    sort
  } = query;

  let q = '';

  try {
    if (isValidParam(sentimentList)) {
      const isInvalidSentimentList =
        !sentimentList.includes('positive') &&
        !sentimentList.includes('negative') &&
        !sentimentList.includes('neutral');

      if (isInvalidSentimentList) {
        return;
      }

      const queryString = generateQuery({
        q,
        valuesList: sentimentList,
        field: 'sentiment',
        operator: 'OR'
      });
      q += queryString;
    }

    if (isValidParam(buList)) {
      const queryString = generateQuery({
        q,
        valuesList: buList,
        field: 'bu',
        operator: 'OR'
      });

      q += queryString;
    }

    if (isValidParam(locationCodeList)) {
      const queryString = generateQuery({
        q,
        valuesList: locationCodeList,
        field: 'locationCode',
        operator: 'OR'
      });

      q += queryString;
    }

    if (isValidParam(typeList)) {
      const queryString = generateQuery({
        q,
        valuesList: typeList,
        field: 'type',
        operator: 'OR'
      });

      q += queryString;
    }

    if (q === '') {
      q = '(*:*)';
    }

    const params = {
      q,
      limit: 0
    };

    // Setting specials params
    if (counts) {
      params.counts = [counts];
    }
    if (include_docs) {
      params.include_docs = include_docs;
    }
    if (sort) {
      params.sort = sort;
    }
    if (limit) {
      params.limit = limit;
    }
    if (bookmark) {
      params.bookmark = bookmark;
    }

    return params;
  } catch (error) {
    console.log(error.message);
    return;
  }
};

module.exports = { generate };
