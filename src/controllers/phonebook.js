const dotenv = require('dotenv');
const { User } = require('../database/models');
const phonebookService = require('../helpers/phonebookService');

dotenv.config();

/**
 *
 * @description - Create a new record
 * @param {*} req - Request Object
 * @param {*} res - Response Object
 */

const createRecord = async (req, res) => {
  const results = await phonebookService.create(req.body, User);
  res.json({
    ...results
  });
};

/**
 *
 * @description - Get phonebook record
 * @param {*} req - Request Object
 * @param {*} res - Response Object
 */
const getRecord = async (req, res) => {
  const { id } = req.params;
  const results = await phonebookService.get(id, User);
  res.json({
    ...results
  });
};

/**
 *
 * @description - Update phone record
 * @param {*} req - Request Object
 * @param {*} res - Response Object
 */
const updateRecord = async (req, res) => {
  const { id } = req.params;
  req.body.id = id;
  const results = await phonebookService.update(req.body, User);
  res.json({
    ...results
  });
};

/**
 *
 * @description - Delete phone record
 * @param {*} req - Request Object
 * @param {*} res - Response Object
 */
const deleteRecord = async (req, res) => {
  const { id } = req.params;
  req.body.id = id;
  const results = await phonebookService.delete(req.body, User);
  res.json({
    ...results
  });
};

module.exports = {
  createRecord,
  getRecord,
  updateRecord,
  deleteRecord
};
