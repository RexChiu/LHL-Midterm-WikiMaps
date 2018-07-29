'use strict';
//Routes going to /maps

const express = require('express');
const router = express.Router();
require('dotenv').config();
const randomString = require('random-string');
const dataHelpers = require('../');

const API_KEY = process.env.API_KEY;

module.exports = knex => {
  //User can see maps available to them with static images
  //GET /maps
  router.get('/', (req, res) => {
    returnMaps()
      .then(results => {
        res.send(results);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });

  //User can see a page to create a new map
  router.get('/new', (req, res) => {
    let templateVars = {
      API_KEY: API_KEY
    };
    res.render('new-map', templateVars);
  });

  //User can see the details of a map using a unique link
  //GET /maps/:id
  router.get('/:id', (req, res) => {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    getMapDetails(fullUrl)
      .then(result => {
        let templateVars = {
          API_KEY: API_KEY,
          map: result[0]
        };
        res.render('map-details', templateVars);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });

  //User can create a map with a map type - and a static map image
  // POST /maps
  router.post('/', (req, res) => {
    if (!req.session.username) {
      res.status(401).send('Login First!');
      return;
    }

    let username = req.session.username;

    let url =
      'http://localhost:8080/maps/' +
      randomString({
        length: 5,
        numeric: true,
        letters: true
      });

    let data = {
      name: req.body.name,
      url: url,
      desc: req.body.desc,
      public: req.body.public,
      rating: null,
      type_id: req.body.type,
      start_lat: req.body.lat,
      start_lng: req.body.lng,
      img_url: `https://maps.googleapis.com/maps/api/staticmap?center=${req.body.lat},${req.body.lng}&zoom=8&size=300x300&maptype=roadmap&key=${API_KEY}`
    };

    //find user_id
    findUserId(username)
      .then(result => {
        data.user_id = result.id;
        return insertMap(data);
      })
      .then(result => {
        res.send(url);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });

  function getMapDetails(url) {
    return new Promise((resolve, reject) => {
      // find map by URL
      knex
        .select()
        .from('maps')
        .where('url', url)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  function insertMap(data) {
    return new Promise((resolve, reject) => {
      // insert map once user_id is found
      knex('maps')
        .insert(data)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  //function to query maps
  function returnMaps() {
    return new Promise((resolve, reject) => {
      knex
        .select()
        .from('maps')
        .where({ public: 'true' })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
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
            resolve(result[0]);
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
