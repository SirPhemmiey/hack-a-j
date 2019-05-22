const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const FormatService = require('./FormatService');
const messageConstant = require('../constant/messageConstants');

const saltRounds = bcrypt.genSaltSync(10);

dotenv.config();
const secret = process.env.SECRET_KEY;

/**
 *
 *
 * @class userService
 * @description class that handles login operation
 */
class userService {
  /**
   *
   * @description method to create a new user
   * @param {*} name - The user's name
   * @param {*} email - The user's email
   * @param {*} password - The user's password
   * @param {*} User - The User model
   * @memberof userService
   */
  static async newUser(username, password, User) {
    const hash = bcrypt.hashSync(password, saltRounds);
    try {
      let data = {};
      const foundUser = await User.findOne({
        where: { username }
      });
      if (foundUser) {
        data = {
          status: messageConstant.FAIL,
          message: 'Username already registered. Please use another one.'
        };
        return FormatService.mountUserSignUp(data);
      } else {
        await User.create({
          username,
          password: hash
        });
        data = {
          status: messageConstant.SUCCESS,
          message: 'Account successfully created'
        };
        return FormatService.mountUserSignUp(data);
      }
    } catch (err) {
      responseData = {
        code: codeConstant.INTERNAL_SERVER_ERROR,
        status: messageConstant.INTERNAL_SERVER_ERROR,
        message: err.message
      };
      return FormatService.mountJSON(responseData);
    }
  }

  /**
   *
   *
   * @description method to login and authenticate a user
   * @param {*} username - The user's name
   * @param {*} password - The user's password
   * @param {*} User - The User model
   * @memberof userService
   */
  static async loginUser(username, password, User) {
    try {
      let data = {};
      const user = await User.findOne({
        where: { username }
      });
      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          const token = jwt.sign(
            {
              id: user.id,
              username: user.username
            },
            secret,
            { expiresIn: '24h' }
          );
          data = {
            status: messageConstant.SUCCESS,
            message: 'You are logged in',
            token,
            username: user.username
          };
          return FormatService.mountAuth(data);
        } else {
          data = {
            status: messageConstant.FAIL,
            message: 'Username or password is wrong'
          };
          return FormatService.mountAuth(data);
        }
      } else {
        data = {
          status: messageConstant.FAIL,
          message: 'Sorry, You do not have an account'
        };
        return FormatService.mountAuth(data);
      }
    } catch (err) {
      responseData = {
        code: codeConstant.INTERNAL_SERVER_ERROR,
        status: messageConstant.INTERNAL_SERVER_ERROR,
        message: err.message
      };
      return FormatService.mountAuth(responseData);
    }
  }
}

module.exports = userService;
