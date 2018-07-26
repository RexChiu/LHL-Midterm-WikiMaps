'use strict';

const express = require('express');
const router = express.Router();

module.exports = knex => {
  //User can see many points on a map /GET /maps/:id/points
  router.get('/', (req, res) => {});

  //End of routes
  return router;
};
