'use strict';
//routes going to /maps/:id/points

const express = require('express');
const router = express.Router();
const randomString = require('random-string');

module.exports = knex => {
  //User can see many points on a map
  //GET /maps/:id/points
  router.get('/', (req, res) => {});

  //User can add a map points
  //POST /maps/:id/points
  router.post('/', (req, res) => {
    insertPoints(res, req.body.markers);

    res.send('Cats.');
  });

  //Data Helper Functions

  function insertPoints(res, points, url) {
    //grabs the points, and calls insertPoint for every point

    for (let elem of points) {
      insertPoint(res, elem).catch(err => {
        console.log(err);
        res.status(500).send(err);
        return;
      });
    }
  }

  function insertPoint(res, point) {
    let url =
      'http://localhost:8080/points/' +
      randomString({
        length: 5,
        numeric: true,
        letters: true
      });

    //get the ID of the mapId
    return getMapId(point.mapId).then(mapId => {
      let data = {
        map_id: mapId,
        title: null,
        desc: null,
        img_url: null,
        rating: null,
        lat: point.lat,
        lng: point.lng,
        addr: point.addr,
        url: url
      };

      // insert map once user_id is found
      knex('points')
        .insert(data)
        .then(result => {
          console.log(result);
          return Promise.resolve(result);
        })
        .catch(err => {
          return Promise.reject(err);
        });

      return Promise.resolve(point);
    });
  }

  function getMapId(url) {
    // find map by URL
    console.log('url: ' + url);

    return knex
      .select('id')
      .from('maps')
      .where('url', 'ilike', `%${url}%`)
      .then(result => {
        return Promise.resolve(result[0].id);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }

  //End of routes
  return router;
};
