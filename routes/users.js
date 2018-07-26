'use strict';

const express = require('express');
const router = express.Router();

module.exports = knex => {
  //User can see their profile that shows favourite maps, maps contributed to GET /users/:id
  router.GET('/:id', (req, res) => {});

  //End of routes
  return router;
};
