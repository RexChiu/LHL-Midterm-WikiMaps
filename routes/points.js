'use strict';
//routes going to /maps/:id/points
require('dotenv').config();
const express = require('express');
const router = express.Router();
const randomString = require('random-string');
const API_KEY = process.env.API_KEY;

module.exports = knex => {
  //User can see many points on a map
  //GET /maps/:id/points
  router.get('/', (req, res) => {
    //get mapId by cutting away /maps/ and /points
    let mapId = req.originalUrl.split('/maps/')[1].split('/points')[0];

    getMapId(mapId).then(map_id => {
      getPoints(map_id).then(result => {
        res.send(result);
      });
    });
  });

  //User can add a map points
  //POST /maps/:id/points
  router.post('/', (req, res) => {
    insertPoint(req.body)
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  });
  //User can delete a maps points
  //DELETE /maps/:id/points/:pointId
  router.delete('/', (req, res) => {
    let mapId = req.originalUrl.split('/maps/')[1].split('/points')[0];
    removePoint(req.body.url);
    res.send(200);
  });

  //Data Helper Functions

  //gets the points that belong to the mapId
  function getPoints(mapId) {
    return knex('points')
      .select('title', 'desc', 'img_url', 'rating', 'lat', 'lng', 'addr', 'url')
      .where('map_id', mapId)
      .then(result => {
        return Promise.resolve(result);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }

  // //grabs the points, and calls insertPoint for every point
  // function insertPoints(points) {
  //   console.log(points);
  //   for (let elem of points) {
  //     insertPoint(elem).catch(err => {
  //       return err;
  //     });
  //   }
  //   return Promise.resolve('Successfully Added');
  // }

  //insert a point into the database, after grabbing the map_id
  function insertPoint(point) {
    //generates unique URL for the point
    let url =
      'http://localhost:8080/points/' +
      randomString({
        length: 5,
        numeric: true,
        letters: true
      });

    //get the ID of the mapId, then construct the point object
    return getMapId(point.mapId).then(mapId => {
      let data = {
        map_id: mapId,
        title: null,
        desc: null,
        img_url: `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${point.lat},${point.lng}
        &fov=180&heading=180&pitch=10
        &key=${API_KEY}`,
        rating: null,
        lat: point.lat,
        lng: point.lng,
        addr: point.addr,
        url: url
      };

      // insert point
      return knex('points')
        .insert(data)
        .then(result => {
          console.log(result);
          return Promise.resolve(url);
        })
        .catch(err => {
          return Promise.reject(err);
        });
    });
  }

  function getMapId(url) {
    // find map by URL
    return knex
      .select('id')
      .from('maps')
      .where('url', 'like', `%${url}%`)
      .then(result => {
        return Promise.resolve(result[0].id);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }

  function removePoint(url) {
    return knex('points')
      .where('url', url)
      .del()
      .then(() => {
        return Promise.resolve(url);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }
  //End of routes
  return router;
};
