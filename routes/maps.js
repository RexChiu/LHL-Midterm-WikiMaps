'use strict';
//Routes going to /maps

const express = require('express');
const router = express.Router();

module.exports = knex => {
  //User can see maps available to them with static images
  //GET /maps
  router.get('/', (req, res) => {});

  //End of routes
  return router;
};
