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
  // Register
  router.post('/register', (req, res) => {
    const { name, username, email, password, password_confirm } = req.body;
    if (name && username && email && password && password_confirm && password === password_confirm) {
      console.log('validated successfully');
      registerUser(req.body) //call registerUser function passing in the req.body
        .then(result => {
          req.session.username = username;
          res.send('success');
        })
        .catch(err => {
          res.status(401).send(err);
        });
    }
  });

  //  Login
  router.post('/login', (req, res) => {
    console.log(req.body); //logs
    if (req.body.username && req.body.password) {
      console.log('running checkUser'); //log
      checkUser(req.body)
        .then(result => {
          console.log('login success'); //log
          req.session.username = req.body.username;
          res.send('success');
        })
        .catch(err => {
          res.status(401).send(err);
        });
    } else {
      res.send('must fill out all fields');
    }
  });

  // Logout
  router.post('/logout', (req, res) => {
    console.log('logout route');
    req.session = null;
    res.redirect('../');
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
  // check user auth details
  function checkUser(reqBody) {
    return new Promise((resolve, reject) => {
      knex('users')
        .select('username')
        .where('username', reqBody.username)
        .andWhere('password', reqBody.password)
        .then(results => {
          if (results.length > 0) {
            console.log('found username');
            resolve('username AND password matches a user in db');
          } else {
            reject('username AND/OR password does not match a user in db');
          }
        });
    });
  }
  // function checkUserPass(reqBody) {
  //   return new Promise((resolve, reject) => {
  //     knex('users')
  //       .select('username')
  //       .where('password', reqBody.password)
  //       .then(results => {
  //         if (result.length > 0) {
  //           resolve('username AND password matches a user in db');
  //         } else {
  //           reject('username AND/OR password does not match a user in db');
  //         }
  //       });
  //   });
  // }
  //End of routes
  return router;
};
