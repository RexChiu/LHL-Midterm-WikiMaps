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
  router.get('/', (req, res) => {});

  //User can see a page to create a new map
  router.get('/new', (req, res) => {
    let templateVars = {
      API_KEY: API_KEY
    };
    res.render('new-map', templateVars);
  });

  //User can create a map with a map type - and a static map image
  // POST /maps
  router.post('/', (req, res) => {
    let name = req.body.name;
    let username = 't'; //temp hardcoded username
    let url =
      'http://localhost:8080/maps/' +
      randomString({
        length: 5,
        numeric: true,
        letters: true
      });
    let desc = req.body.desc;
    let visible = req.body.public;
    let rating = null;
    let type = req.body.type;
    let start_lat = req.body.lat;
    let start_lng = req.body.lng;
    let img_url = 'https://i.pinimg.com/originals/78/5c/39/785c39aa38a5867388fe432079f7808d.jpg';

    let data = {
      name: name,
      url: url,
      desc: desc,
      public: visible,
      rating: rating,
      type_id: type,
      start_lat: start_lat,
      start_lng: start_lng,
      img_url: img_url
    };

    //console.log(data);

    //find user_id
    knex
      .select('id')
      .from('users')
      .where('username', 't')
      .then(result => {
        data.user_id = result[0].id;

        return insertMap(data);
      })
      .then(result => {
        res.send(url);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });

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

  //End of routes
  return router;
};
