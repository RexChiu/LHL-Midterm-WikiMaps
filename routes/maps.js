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
    returnTypes().then(types => {
      console.log(types);
      let templateVars = {
        API_KEY: API_KEY,
        types: types,
        cookie: req.session.userId
      };
      res.render('new-map', templateVars);
    });
  });

  //User can see the details of a map using a unique link
  //GET /maps/:id
  router.get('/:id', (req, res) => {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log('Full URL: ', fullUrl);

    getMapDetails(fullUrl)
      .then(result => {
        console.log('Result: ', result);
        let templateVars = {
          API_KEY: API_KEY,
          map: result[0],
          cookie: req.session.userId
        };
        res.render('map-details', templateVars);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });

  //User can favourite a map
  router.put('/:id/fav', (req, res) => {
    if (!req.session.userId) {
      res.status(401).send('Login First!');
      return;
    }

    let userId = req.session.userId;
    let mapUrl = req.params.id;

    //find map_id
    getMapId(mapUrl)
      .then(mapId => {
        return favouriteMap(mapId, userId).then(result => {
          console.log('Successfully Added Favourites');
          res.send('Added');
        });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });

  //User can create a map with a map type - and a static map image
  // POST /maps
  router.post('/', (req, res) => {
    if (!req.session.userId) {
      res.status(401).send('Login First!');
      return;
    }

    let userId = req.session.userId;

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
      img_url:
        `https://maps.googleapis.com/maps/api/staticmap?center=${req.body.lat},${req.body.lng}` +
        `&zoom=${req.body.zoom}&size=450x450&maptype=roadmap&key=${API_KEY}`,
      zoom: req.body.zoom
    };

    data.user_id = userId;
    insertMap(data)
      .then(result => {
        res.send(data);
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

  function getMapId(url) {
    return new Promise((resolve, reject) => {
      // find map by URL
      return knex
        .select('id')
        .from('maps')
        .where('url', 'like', `%${url}%`)
        .then(result => {
          resolve(result[0].id);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  function favouriteMap(mapId, userId) {
    return new Promise((resolve, reject) => {
      return knex('user_fav')
        .insert({ map_id: mapId, user_id: userId })
        .then(() => resolve('Successfully Added'))
        .catch(err => reject(err));
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

  //function to get map types
  function returnTypes() {
    return knex
      .select()
      .from('types')
      .then(result => {
        return result;
      });
  }

  //End of routes
  return router;
};
