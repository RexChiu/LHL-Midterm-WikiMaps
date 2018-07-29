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
    if (req.session.userId) {
      insertPoint(req.body)
        .then(result => {
          res.send(result);
        })
        .catch(err => {
          console.log(err);
          res.status(500).send(err);
        });
    } else {
      res.status(401).send('Not Authorized');
    }
  });

  //User can delete a maps points
  //DELETE /maps/:id/points/:pointId
  router.delete('/', (req, res) => {
    if (req.session.userId) {
      console.log(req.body);
      removePoint(req.body.url, req.body.lat, req.body.lng, req.body.mapUrl);
      res.send(200);
    } else {
      res.status(401).send('Not Authorized');
    }
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
      let pointData = {
        map_id: mapId,
        title: point.title,
        desc: point.desc,
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
        .insert(pointData)
        .then(() => {
          return getMapImg(mapId);
        })
        .then(img_url => {
          console.log('we got here');
          let newUrl = newMapImg(img_url, pointData);
          return knex('maps')
            .where('id', mapId)
            .update('img_url', newUrl);
        })
        .then(() => {
          return Promise.resolve(url);
        })
        .catch(err => {
          return Promise.reject(err);
        });
    });
  }

  function getMapImg(mapId) {
    // find map img url
    return knex
      .select('img_url')
      .from('maps')
      .where('id', mapId)
      .then(result => {
        return Promise.resolve(result[0].img_url);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }
  function newMapImg(url, point) {
    let pointText = `markers=${Number.parseFloat(point.lat).toPrecision(6)},${Number.parseFloat(point.lng).toPrecision(6)}&`;
    let newUrl = spliceSplit(url, 47, 0, pointText);
    console.log(newUrl);
    return newUrl;
  }
  // to splice a str like an array
  function spliceSplit(str, index, count, add) {
    var strToArr = str.split('');
    strToArr.splice(index, count, add);
    return strToArr.join('');
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

  function removePoint(url, lat, lng, mapUrl) {
    return knex('points')
      .where('title', url)
      .del()
      .then(() => {
        let locationStr = 'markers=' + lat + ',' + lng + '&';
        console.log(locationStr + 'location STRING');
        return knex('maps')
          .select('img_url')
          .where('url', 'like', `%${mapUrl}%`)
          .then(result => {
            console.log(result);
            let currentMapUrl = result[0].img_url;
            currentMapUrl = currentMapUrl.split(locationStr).join('');
            return currentMapUrl;
          })
          .then(currentMapUrl => {
            return console.log('new url =', currentMapUrl);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      })
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
