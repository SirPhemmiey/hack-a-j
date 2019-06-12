const dotenv = require('dotenv');
const redis = require('async-redis');
const debug = require('debug')('api:server');
const phonebookService = require('../helpers/phonebookService');
const { Phonebook } = require('../database/models');

dotenv.config();

const client = redis.createClient(process.env.REDIS_PORT);

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
  const { id, page, limit } = req.params;
  const recordsKey = 'record:single';
  const singleRecord = await client.get(recordsKey);
  if (singleRecord) {
    res.json({
      ...JSON.parse(singleRecord)
    });
  } else {
    const results = await phonebookService.get(id, Phonebook);
    await client.setex(recordsKey, 3600, JSON.stringify(results));
    res.json({
      ...results
    });
  }
};

const getAllRecords = async (req, res) => {
  const recordsKey = 'record:all';
  const allRecords = await client.get(recordsKey);
  if (allRecords) {
    res.json({
      ...JSON.parse(allRecords)
    });
  } else {
    const results = await phonebookService.getAllRecords(req.query, Phonebook);
    await client.setex(recordsKey, 3600, JSON.stringify(results));
    res.json({
      ...results
    });
  }
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
  getAllRecords,
  updateRecord,
  deleteRecord
};
