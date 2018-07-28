'use strict';

/* ALL ROUTES IN THIS FILE BEING WITH: "/users" -/
/- "POST /logout" will be read as /users/logout */

const express = require('express');
const router = express.Router();

module.exports = knex => {
  //User can see their profile that shows favourite maps, maps contributed to

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
  //  Login
  router.post('/login', (req, res) => {
    let templateVars = {
      user: 1 //hardcoding user for timebeing.
    };
    console.log('login route');
    res.send('<p>login route</p>');
  });
  // Logout
  router.post('/logout', (req, res) => {
    let templateVars = {
      user: 1 //hardcoding user for timebeing.
    };
    console.log('logout route');
    res.send('<p>logout route<p>');
  });
  // Register
  router.post('/register', (req, res) => {
    let templateVars = {
      user: 1 //hardcoding user for timebeing.
    };
    //
    console.log(req.body);
    res.send('register succesfull');
  });

  // KNEX USER FUNCTIONS
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
