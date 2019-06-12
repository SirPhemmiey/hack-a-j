const createError = require('http-errors');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const helmet = require('helmet');
const debug = require('debug')('app:server');
const swaggerDocument = require('./src/config/swagger.json');
const { cors } = require('./src/config/cors');
const rateLimit = require('express-rate-limit');
const redis = require('redis');

const routers = require('./src/routes');

dotenv.config();

const client = redis.createClient(process.env.REDIS_PORT);
const app = express();

function security(app) {
  app.use(helmet());
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // maximum number of requests from an IP
  });
  app.use(apiLimiter);
}
security(app);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* Add swagger */
swaggerDocument.host = `${process.env.HOST}:${process.env.PORT}`;
swaggerDocument.schemes = process.env.SCHEMES;
app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(
    swaggerDocument,
    null,
    null,
    '.swagger-ui .topbar { display: none }',
    '../favicon.png',
    null,
    'Phonebook API'
  )
);
app.use(cors);

/* Routes */
app.use('/api/v1', routers);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

client.on('error', (err) => {
  debug(`Error ${err}`);
});

client.on('connect', () => {
  debug('Redis successfully connected');
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
