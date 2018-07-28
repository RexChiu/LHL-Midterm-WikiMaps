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
    const { name, username, email, password, password_confirm } = req.body;
    if (name && username && email && password && password_confirm && password === password_confirm) {
      console.log('validated successfully');
      registerUser(req.body)
        .then(result => res.send(req.body))
        .catch(err => {
          res.status(500).send(err);
        });
    }
  });

  // KNEX USER FUNCTIONS
  // return user maps
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
  // register user
  function registerUser(reqBody) {
    return new Promise((resolve, reject) => {
      delete reqBody.password_confirm; //javascript function to remove key value pair (password confirm:) from object
      console.log('THIS IS WHAT WE ARE INSERTING:', reqBody);
      knex('users')
        .insert(reqBody)
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
