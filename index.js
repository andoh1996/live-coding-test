const express = require('express');
const morgan = require('morgan');
const { unless } = require('express-unless');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const mongoose = require('mongoose');

const dotenv = require('dotenv');

const swaggerjsdoc = require('swagger-jsdoc');
const swaggerui = require('swagger-ui-express');

const fs = require('fs');
const path = require('path');

const auth = require('./src/middlewares/auth.middleware');
const error = require('./src/middlewares/error.middleware');




const app = express();
dotenv.config({ path: './config.env' });


// Use the CORS middleware globally
app.use(cors({
  origin: '*', // You can replace '*'
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204,  
}));

app.options('*', cors()); // Preflight requests for all routes


// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


// This line is setting a property `unless` on the `authenticateToken` function, allowing the use of the `unless` middleware.
auth.authenticateToken.unless = unless;

// This line is adding the `auth.authenticateToken` middleware to the Express application.
// The middleware is configured with the `unless` function, which will skip authentication for specific paths and HTTP methods.
app.use(
  auth.authenticateToken.unless({
    path: [
      { url: '/', methods: ['GET'] },
      { url: '/auth/register', methods: ['POST'] },
      { url: '/auth/login', methods: ['POST'] },
    ],
  }),
);

// Sanitize user input data before reaching other middlewares
app.use(mongoSanitize());

app.use(express.json());


// Set the default promise implementation to the global Promise constructor
mongoose.Promise = global.Promise;

///////////////connecting to mongodb//////////
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB, {
    useUnifiedTopology: true,
}).then(() => {
    console.log('DB Connection Success');

});

//  ROUTES
app.use('/', require('./src/routes/index.route'));
app.use('/auth', require('./src/routes/auth.route'));




/////Express Error Handler
app.use(error.errorHandler);


module.exports = app;
