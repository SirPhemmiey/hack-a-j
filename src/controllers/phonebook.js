const dotenv = require('dotenv');
const { Phonebook } = require('../database/models');
const phonebookService = require('../helpers/phonebookService');

dotenv.config();

/**
 *
 * @description - Create a new record
 * @param {*} req - Request Object
 * @param {*} res - Response Object
 */

const createRecord = async (req, res) => {
  const results = await phonebookService.create(req.body, Phonebook);
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
  const results = await phonebookService.get(id, Phonebook);
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
  const results = await phonebookService.update(req.body, Phonebook);
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
  const results = await phonebookService.delete(id, Phonebook);
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
