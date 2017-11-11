/**
 * Class representing the exceptions
 */
class Exception {
  /**
     * @description Create an exception
     * @param {String} description - The exception description
     */
  constructor(description) {
    this.description = description;
  }

  /**
     * @method toString
     * @description Prints the exception's description.
     * @returns {String} The exception description.
     */
  toString() {
    return this.description;
  }
}

/**
   * Class representing the invalid parameters exception
   * @extends Exception
   */
class InvalidParamsException extends Exception {
  /**
     * @description Create an exception
     */
  constructor() {
    super('Params are not valid.');
  }
}

/**
   * Class representing the invalid date exception
   * @extends Exception
   */
class InvalidDateException extends Exception {
  /**
     * @description Create an exception
     */
  constructor() {
    super(`Invalid date! Should be a valid 
      date object or a parsable string`);
  }
}

const exceptions = {
  InvalidDateException,
  InvalidParamsException
};

module.exports = exceptions;
