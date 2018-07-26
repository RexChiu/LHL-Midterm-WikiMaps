'use strict';
//Routes going to /maps

const express = require('express');
const router = express.Router();
require('dotenv').config();

const API_KEY = process.env.API_KEY;

module.exports = knex => {
  //User can see maps available to them with static images
  //GET /maps
  router.get('/', (req, res) => {});

  //User can see a page to create a new map
  router.get('/new', (req, res) => {
    let templateVars = {
      API_KEY: API_KEY
    };
    res.render('new-map', templateVars);
  });

  //End of routes
  return router;
};
