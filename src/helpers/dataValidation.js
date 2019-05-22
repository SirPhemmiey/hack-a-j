const util = require('util');
const messages = require('../constant/messageConstants');

/**
 *
 * @description Validates the request body of the passed data
 * @class ValidationForm
 */
class ValidationForm {
  /**
   *
   * @description It validates the login/signup request
   * @param {*} req Request object that contains username and password
   * @param {*} res Response object
   * @param {function} next calls the next function or middleware
   * @returns error object or calls the next function
   * @memberof ValidationForm
   */
  static validateLoginAndSignup(req, res, next) {
    const { username, password } = req.body;
    if (!username || !password) {
      throw util.format(messages.EMPTY, 'Username/Password');
    } else {
      return next();
    }
  }

  /**
   *
   *
   * @@description It validates a new phonebook record
   * @param {*} req Request object that contains the firstname, lastname, email, phone etc
   * @param {*} res Response object
   * @param {*} next calls the next function or middleware
   * @returns error object or calls the next function
   * @memberof ValidationForm
   */
  static validateNewRecord(req, res, next) {
    const {
      firstname, lastname, email, phone
    } = req.body;
    if (!firstname || !lastname || !email || !phone) {
      throw util.format(messages.EMPTY, 'Values');
    } else {
      return next();
    }
  }
}

module.exports = ValidationForm;
