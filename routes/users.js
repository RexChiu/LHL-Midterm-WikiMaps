'use strict';

/* ALL ROUTES IN THIS FILE BEING WITH: "/users" -/
/- "POST /logout" will be read as /users/logout */

const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');

module.exports = knex => {
  //User can see their profile that shows favourite maps, maps contributed to

  router.get('/maps', (req, res) => {
    console.log("Getting User's Maps");
    console.log(req.session.id);
    returnUserMaps(req.session.id)
      .then(results => {
        res.send(results);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });

  //user can get their favourite maps
  router.get('/fav', (req, res) => {
    let username = req.session.username;
    findUserId(username)
      .then(userId => {
        return returnFavMaps(userId);
      })
      .then(result => {
        res.send(result);
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
          return findUserId(username);
        })
        .then(userid => {
          req.session.id = userid;
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
          return findUserId(username);
        })
        .then(userid => {
          req.session.id = userid;
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
    req.session = null;
    res.redirect('../');
  });

  // KNEX USER FUNCTIONS

  // return user favourite maps
  function returnFavMaps(userId) {
    console.log('searching');
    return new Promise((resolve, reject) => {
      return knex('user_fav')
        .select()
        .join('maps', { 'user_fav.map_id': 'maps.id' })
        .where('user_fav.user_id', userId)
        .then(result => {
          console.log('found these favourite maps: ' + result);
          if (result.length > 0) {
            resolve(result);
          } else {
            console.log('No Favourites');
            reject('no maps found');
          }
        })
        .catch(err => {
          console.log('Error: ' + err);
          reject(err);
        });
    });
  }

  // return user maps
  function returnUserMaps(userId) {
    return new Promise((resolve, reject) => {
      return knex
        .select()
        .from('maps')
        .where('user_id', userId)
        .then(result => {
          if (result.length > 0) {
            resolve(result);
          } else {
            reject('no maps found');
          }
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

  function findUserId(username) {
    return new Promise((resolve, reject) => {
      knex
        .select('id')
        .from('users')
        .where('username', username)
        .then(result => {
          if (result.length > 0) {
            resolve(result[0].id);
          } else {
            reject('No User Found');
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  //End of routes
  return router;
};
