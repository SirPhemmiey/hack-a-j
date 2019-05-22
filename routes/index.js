const express = require('express');
const {
  createRecord,
  getRecord,
  updateRecord,
  deleteRecord
} = require('../src/controllers/phonebook');
const { createUser, loginUser } = require('../src/controllers/users');
const verifyToken = require('../src/helpers/verifyToken');

const router = express.Router();

router.post('/createUser', createUser);

router.post('/loginUser', loginUser);

router.post('/createRecord', createRecord);

router.get('/getRecord/:id([0-9]+)', getRecord);

router.put('/updateRecord/:id([0-9]+)', updateRecord);

router.delete('deleteRecord/:id([0-9]+)', deleteRecord);
