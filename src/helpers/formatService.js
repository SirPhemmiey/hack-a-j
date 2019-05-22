/**
 *
 * @description - Class for formating JSON response
 * @class FormatService
 */
class FormatService {
  /**
   *
   *
   * @description method to create JSON response for phonebook CRUD operations
   * @param {*} object response object
   * @returns object
   * @memberof FormatService
   */
  static mountJSON(object) {
    const { code, status, message } = object;
    return {
      code,
      status,
      message
    };
  }

  /**
   *
   *
   * @description method to return JSON response for auth
   * @param {*} object
   * @returns object
   * @memberof FormatService
   */
  static mountAuth(object) {
    const {
      code, status, message, token = null
    } = object;
    return {
      code,
      status,
      message,
      token
    };
  }

  /**
   *
   * @description method to create a json response for user signup
   * @param {object} contains message returned from the operation
   * @returns {object} JSON response object
   * @memberof FormatService
   */
  static mountUserSignUp(object) {
    const { status, message } = object;
    return {
      status,
      message
    };
  }
}

module.exports = FormatService;
