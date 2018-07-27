'use strict';
//routes going to /users

const express = require('express');
const router = express.Router();

module.exports = knex => {
  //User can see their profile that shows favourite maps, maps contributed to
  //GET /users/:id
  router.get('/:id', (req, res) => {
    console.log(`calling returnUserMaps`);
    returnUserMaps(req.params.id)
      .then(results => {
        console.log('returning results:', results);
        res.send(results);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });
  function returnUserMaps(id) {
    return new Promise((resolve, reject) => {
      knex
        .select()
        .from('maps')
        .where('user_id', id)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  //End of routes
  return router;
};
