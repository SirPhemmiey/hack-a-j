const express = require('express');
const {
  createRecord, getRecord, updateRecord, deleteRecord
} = require('../controllers/phonebook');
const { createUser, loginUser } = require('../controllers/users');
const validationForm = require('../helpers/dataValidation');
const verifyToken = require('../helpers/verifyToken');

const router = express.Router();

router.post('/createUser', validationForm.validateLoginAndSignup, createUser);

router.post('/loginUser', validationForm.validateLoginAndSignup, loginUser);

router.post('/createRecord', validationForm.validateNewRecord, createRecord);

router.get('/getRecord/:id([0-9]+)', getRecord);

router.put('/updateRecord/:id([0-9]+)', updateRecord);

router.delete('deleteRecord/:id([0-9]+)', deleteRecord);

module.exports = router;
