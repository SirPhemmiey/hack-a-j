const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const debug = require('debug');

dotenv.config();
const secret = process.env.SECRET_KEY;

/**
 *
 *
 * @class VerifyToken
 * @description Verifies that a token exist in the request header before persmission is granted.
 */
class VerifyToken {
  /**
   *
   *
   * @param {*} req Request object
   * @param {*} res Response object
   * @param {*} next
   * @description decodes and verifies the token
   * @memberof VerifyToken
   */
  static verify(req, res, next) {
    const header = req.headers['x-access-token'] || req.headers.authorization;
    console.log(req.headers);
    if (typeof header !== 'undefined') {
      const bearer = header.split(' ');
      const token = bearer[1];
      req.token = token;
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          const data = {
            token: null,
            message: err.message
          };
          return res.json(data);
        }
        req.user = decoded;
        next();
      });
    } else {
      // If header is undefined return Forbidden (403)
      const data = {
        token: null,
        message: 'Unauthorized Access. Please log in'
      };
      return res.json(data);
    }
  }
}

module.exports = VerifyToken;
