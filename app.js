const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const helmet = require('helmet');
const { cors } = require('./src/config/cors');

const routers = require('./src/routes');

dotenv.config();
const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors);

/* Routes */
app.use('/api/v1', routers);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  switch (err.status) {
    case 400:
      res.json({ status: 'fail', message: err.message });
      break;
    default:
      res.json({ status: 'fail', message: err.toString() });
      break;
  }
});

module.exports = app;
