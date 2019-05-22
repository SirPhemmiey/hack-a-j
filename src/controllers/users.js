const dotenv = require('dotenv');
const { User } = require('../database/models');
const userService = require('../helpers/userService');

dotenv.config();

/**
 *
 * @description - Creates a new user
 * @param {*} req - Request Object
 * @param {*} res - Response Object
 */
const createUser = async (req, res) => {
  const { username, password } = req.body;
  const results = await userService.newUser(username, password, User);
  res.json({
    ...results
  });
};

/**
 *
 * @description function to login user
 * @param {*} req - Request Object
 * @param {*} res - Response Object
 */
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const results = await userService.loginUser(username, password, User);
  res.json({
    ...results
  });
};

module.exports = {
  loginUser,
  createUser
};
