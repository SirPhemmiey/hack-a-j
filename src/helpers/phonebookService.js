const dotenv = require('dotenv');
const FormatService = require('./FormatService');
const messageConstant = require('../constant/messagesConstant');
const codeConstant = require('../constant/codesConstants');

dotenv.config();
/**
 *
 * @description class that handles phonebook operations
 * @class phoneService
 */
class phoneService {
  /**
   *
   * @description method to create a record
   * @param {object} data - Object containing phonebook information
   * @param {*} User - The User model
   * @returns an object
   * @memberof phoneService
   */
  static async create(data, User) {
    let responseData = {};
    const {
      firstname, lastname, email, phone, mobile, company, title
    } = data;
    try {
      await User.create({
        firstname,
        lastname,
        email,
        phone,
        mobile,
        company,
        title
      });
      responseData = {
        code: codeConstant.OK,
        status: messageConstant.SUCCESS,
        message: 'Operation Successful'
      };
      return FormatService.mountJSON(responseData);
    } catch (err) {
      throw err;
    }
  }

  /**
   *
   * @description method to get a record
   * @param {number} id - ID of the phonebook information
   * @param {*} User - The User model
   * @returns an object
   * @memberof phoneService
   */
  static async get(id, User) {
    let responseData = {};
    try {
      const phoneDetails = await User.findOne({
        where: { id }
      });
      if (phoneDetails) {
        responseData = {
          code: codeConstant.OK,
          status: messageConstant.SUCCESS,
          data: phoneDetails
        };
        return FormatService.mountGet(responseData);
      }
    } catch (err) {
      throw err;
    }
  }

  /**
   *
   * @description method to update a record
   * @param {object} data - Object that contains the data to be updated
   * @param {*} User - The User's model
   * @returns object
   * @memberof phoneService
   */
  static async update(data, User) {
    let responseData = {};
    const {
      firstname, lastname, email, phone, mobile, company, title, id
    } = data;
    try {
      const user = await User.findOne({
        where: { id }
      });

      if (user) {
        user.update({
          firstname: firstname || user.firstname,
          lastname: lastname || user.lastname,
          email: email || user.email,
          phone: phone || user.phone,
          mobile: mobile || user.mobile,
          company: company || user.company,
          title: title || user.title
        });
        responseData = {
          code: codeConstant.OK,
          status: messageConstant.SUCCESS
        };
        return FormatService.mountJSON(responseData);
      } else {
        responseData = {
          status: codeConstant.NOT_FOUND,
          message: messageConstant.NOT_FOUND
        };
        return FormatService.mountJSON(responseData);
      }
    } catch (err) {
      throw err;
    }
  }

  /**
   *
   * @description method to delete a record
   * @param {number} id - Id of the record to be deleted
   * @param {*} User - The User's model
   * @returns object
   * @memberof phoneService
   */
  static async delete(id, User) {
    let responseData = {};
    if (!id) {
      responseData = {
        code: codeConstant.CONFLICT,
        status: 'No Id specified',
        data: {}
      };
      return FormatService.mountJSON(responseData);
    }
    try {
      const result = await User.destroy({
        where: { id }
      });
      if (result) {
        responseData = {
          code: codeConstant.OK,
          status: messageConstant.SUCCESS,
          data: {}
        };
        return FormatService.mountJSON(responseData);
      } else {
        responseData = {
          code: codeConstant.INTERNAL_SERVER_ERROR,
          status: messageConstant.INTERNAL_SERVER_ERROR,
          data: {}
        };
        return FormatService.mountJSON(responseData);
      }
    } catch (err) {
      throw err;
    }
  }
}

module.exports = phoneService;
