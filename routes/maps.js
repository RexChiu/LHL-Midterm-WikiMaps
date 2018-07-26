'use strict';

const express = require('express');
const router = express.Router();

module.exports = knex => {
  //User can see maps available to them with static images GET /maps
  router.GET('/', (req, res) => {});

  //End of routes
  return router;
};
