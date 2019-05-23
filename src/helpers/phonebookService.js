const { Op, Sequelize } = require('sequelize');

const dotenv = require('dotenv');
const FormatService = require('./FormatService');
const messageConstant = require('../constant/messageConstants');
const codeConstant = require('../constant/codeConstants');
const paginate = require('../../utils/pagination');

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
   * @param {*} Phonebook - The phonebook model
   * @returns an object
   * @memberof phoneService
   */
  static async create(data, Phonebook) {
    let responseData = {};
    const {
      firstname, lastname, email, phone, mobile, company, title
    } = data;
    try {
      await Phonebook.create({
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
      responseData = {
        code: codeConstant.INTERNAL_SERVER_ERROR,
        status: messageConstant.FAIL,
        message: err.message
      };
      return FormatService.mountJSON(responseData);
    }
  }

  /**
   *
   * @description method to get a record
   * @param {number} id - ID of the phonebook information
   * @param {*} Phonebook - The phonebook model
   * @returns an object
   * @memberof phoneService
   */
  static async get(id, Phonebook) {
    let responseData = {};
    try {
      const phoneDetails = await Phonebook.findOne({
        where: { id }
      });
      if (phoneDetails) {
        responseData = {
          code: codeConstant.OK,
          status: messageConstant.SUCCESS,
          data: phoneDetails
        };
        return FormatService.mountJSON(responseData);
      } else {
        responseData = {
          code: codeConstant.NOT_FOUND,
          status: messageConstant.FAIL,
          message: messageConstant.NOT_FOUND
        };
        return FormatService.mountJSON(responseData);
      }
    } catch (err) {
      responseData = {
        code: codeConstant.INTERNAL_SERVER_ERROR,
        status: messageConstant.FAIL,
        message: err.message
      };
      return FormatService.mountJSON(responseData);
    }
  }

  /**
   *
   * @description method to get all records
   * @param {object} pageoptions
   * @param {*} Phonebook - The phonebook model
   * @returns an object
   * @memberof phoneService
   */
  static async getAllRecords(queryOptions, Phonebook) {
    const { firstname, limit = 10, page = 1 } = queryOptions;
    const { _limit, offset } = paginate(page, limit);

    const queryBuilder = {
      distinct: true,
      attributes: {
        exclude: ['created_date', 'updated_date']
      },
      offset,
      limit: _limit
    };
    if(firstname) {
      queryBuilder.where = {
        firstname: {
          [Op.like]: `%${firstname}%`
        }
      }
    }
    let responseData = {};
    try {
      const details = await Phonebook.findAll(queryBuilder);
      responseData = {
        code: codeConstant.OK,
        status: messageConstant.SUCCESS,
        data: details
      };
      return FormatService.mountJSON(responseData);
    } catch (err) {
      responseData = {
        code: codeConstant.INTERNAL_SERVER_ERROR,
        status: messageConstant.FAIL,
        message: err.message
      };
      return FormatService.mountJSON(responseData);
    }
  }

  /**
   *
   * @description method to update a record
   * @param {object} data - Object that contains the data to be updated
   * @param {*} Phonebook - The Phonebook model
   * @returns object
   * @memberof phoneService
   */
  static async update(data, Phonebook) {
    let responseData = {};
    const {
      firstname, lastname, email, phone, mobile, company, title, id
    } = data;
    try {
      const phonebook = await Phonebook.findOne({
        where: { id }
      });

      if (phonebook) {
        phonebook.update({
          firstname: firstname || phonebook.firstname,
          lastname: lastname || phonebook.lastname,
          email: email || phonebook.email,
          phone: phone || phonebook.phone,
          mobile: mobile || phonebook.mobile,
          company: company || phonebook.company,
          title: title || phonebook.title
        });
        responseData = {
          code: codeConstant.OK,
          status: messageConstant.SUCCESS
        };
        return FormatService.mountJSON(responseData);
      } else {
        responseData = {
          code: codeConstant.NOT_FOUND,
          status: messageConstant.FAIL,
          message: messageConstant.NOT_FOUND
        };
        return FormatService.mountJSON(responseData);
      }
    } catch (err) {
      responseData = {
        code: codeConstant.INTERNAL_SERVER_ERROR,
        status: messageConstant.FAIL,
        message: err.message
      };
      return FormatService.mountJSON(responseData);
    }
  }

  /**
   *
   * @description method to delete a record
   * @param {number} id - Id of the record to be deleted
   * @param {*} Phonebook - The Phonebook model
   * @returns object
   * @memberof phoneService
   */
  static async delete(id, Phonebook) {
    let responseData = {};
    try {
      const findId = await Phonebook.findOne({
        where: { id }
      });
      if (findId) {
        const result = await Phonebook.destroy({
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
            status: messageConstant.FAIL,
            data: {}
          };
          return FormatService.mountJSON(responseData);
        }
      } else {
        responseData = {
          code: codeConstant.NOT_FOUND,
          status: messageConstant.FAIL,
          message: messageConstant.NOT_FOUND
        };
        return FormatService.mountJSON(responseData);
      }
    } catch (err) {
      responseData = {
        code: codeConstant.INTERNAL_SERVER_ERROR,
        status: messageConstant.FAIL,
        message: err.message
      };
      return FormatService.mountJSON(responseData);
    }
  }
}

module.exports = phoneService;
