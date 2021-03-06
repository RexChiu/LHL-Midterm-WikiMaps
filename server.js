'use strict';

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || 'development';
const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const sass = require('node-sass-middleware');
const app = express();

const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require('./routes/users');
const mapsRoutes = require('./routes/maps');
const mapPointsRoutes = require('./routes/points');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Use CookieSession to record and return session token
app.use(
  cookieSession({
    name: 'session',
    keys: ['Rex loves cats more than dogs'],
    // Optional:
    maxAge: 24 * 60 * 60 * 1000 // 1 Day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
  })
);
// SASS MIDDLEWARE
app.use(
  '/styles',
  sass({
    src: __dirname + '/styles',
    dest: __dirname + '/public/styles',
    debug: true,
    outputStyle: 'expanded'
  })
);
app.use(express.static('public'));

// Mount all resource routes
app.use('/maps/:id/points', mapPointsRoutes(knex));
app.use('/maps', mapsRoutes(knex));
app.use('/users', usersRoutes(knex));

// Home page
app.get('/', (req, res) => {
  let templateVars = {
    cookie: req.session.userId
  };
  res.render('index', templateVars);
});
// Profile page
app.get('/profile', (req, res) => {
  let templateVars = {
    cookie: req.session.userId,
    user: 1 //hardcoding user for timebeing.
  };
  res.render('profile', templateVars);
});
app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});
