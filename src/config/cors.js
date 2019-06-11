const cors = require('cors');
const dotenv = require('dotenv');
// Change it, for cross domain in production

dotenv.config();

const whitelist = [process.env.PHONEBOOK_API, `http://localhost:${process.env.PORT}`];
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
module.exports = { cors: cors(corsOptions) };
