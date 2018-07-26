"use strict";
const express = require('express');
const router  = express.Router();
module.exports = (knex) => {
  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });
//                        MVP Features:              
//----------------------------------------------------------------

  //User can see maps available to them with static images 
  router.GET("/maps", (req, res) => {
    knex
      .select
      .from
      .then((results) => {
        res.json(results);
    });
  });
  //User can create a map with a map type - and a static map image
  router.POST("/maps", (req, res) => {
    knex
      .select
      .from
      .then((results) => {
        res.json(results);
    });
  });
  //User can see a page to create a new map
  router.GET("/maps/new", (req, res) => {
    knex
      .select
      .from
      .then((results) => {
        res.json(results);
    });
  });
  //User can see the details of a map using a unique link
  router.GET("/maps/:id", (req, res) => {
    knex
      .select
      .from
      .then((results) => {
        res.json(results);
    });
  });
  // User can modify a map details 
  router.GET("/maps/:id", (req, res) => {
    knex
      .select
      .from
      .then((results) => {
        res.json(results);
    });
  });
  //User can see many points on a map 
  router.GET("/maps/:id/points", (req, res) => {
    knex
      .select
      .from
      .then((results) => {
        res.json(results);
    });
  });
  //User can modify a map’s points - and update static map image url
  router.PUT("/maps/:id/points", (req, res) => {
    knex
      .select
      .from
      .then((results) => {
        res.json(results);
    });
  });
  //User can add a map points
  router.POST("/maps/:id/points", (req, res) => {
    knex
      .select
      .from
      .then((results) => {
        res.json(results);
    });
  });
  router.POST("/maps/:id/points/name", (req, res) => {
    knex
      .select
      .from
      .then((results) => {
        res.json(results);
    });
  });
  router.POST("/maps/:id/points/address", (req, res) => {
    knex
      .select
      .from
      .then((results) => {
        res.json(results);
    });
  });
  //User can see the title, description, and image of a point 
  router.GET("/maps/:id/points/:id", (req, res) => {
    knex
      .select
      .from
      .then((results) => {
        res.json(results);
    });
  });
  //User can favourite multiple maps 
  router.POST("/users/fav", (req, res) => {
    knex
      .select
      .from
      .then((results) => {
        res.json(results);
    });
  });
  //User can authenticate 
  router.POST("/users/login", (req, res) => {
    knex
      .select
      .from
      .then((results) => {
        res.json(results);
    });
  });
  //User can log-out 
  router.POST("/users/logout", (req, res) => {
    knex
      .select
      .from
      .then((results) => {
        res.json(results);
    });
  });
  //User can register new account 
  router.POST("/users/register", (req, res) => {
    knex
      .select
      .from
      .then((results) => {
        res.json(results);
    });
  });
  //User can see their profile that shows favourite maps, maps contributed to 
  router.GET("/users/:id", (req, res) => {
    knex
      .select
      .from
      .then((results) => {
        res.json(results);
    });
  });
  //Extra Features:
  //9-User can search for an address and have it show up on map as point (geocoding)
  //Browser sends address to server - Server responds with location
  //9-Search for public maps by name
  //  GET /maps?=name
  //5-User can add a contributor to be able to edit your map
  router.POST("/maps/contributors", (req, res) => {
    knex
      .select
      .from
      .then((results) => {
        res.json(results);
    });
  });
  //5-User can set their map to be private
  router.PUT("/maps/:id/private", (req, res) => {
    knex
      .select
      .from
      .then((results) => {
        res.json(results);
    });
  });
  //3-User can see a suggestion for usernames as they search for contributor (query for every input change for LIKE %input%)
  //  GET /users?=%str%
  //3-User can search for a restaurant/point to add to the map (places API)
  //? API Call ? PUT /maps/:id/points 
  //3-User can share their map to others (add email for automated emailing) API emailing
  router.POST("/maps/:id/share", (req, res) => {
    knex
      .select
      .from
      .then((results) => {
        res.json(results);
    });
  });
  //1-User can click on a point/list and be redirected to google maps for routing (routes API)
    GET /gmaps?=...
  //1-User can rate a map
  router.PUT("/maps/:id/rate", (req, res) => {
    knex
      .select
      .from
      .then((results) => {
        res.json(results);
    });
  });
  //User location stripped from Navigator for generating current location (local search results)
  //  GET /maps/new, GET /maps
  //User location grabbed from IP if not generated by Navigator
  //	BROWSER http://ip-api.com/
  //Show images of point using places API
  router.GET("/maps/:id/points/:id", (req, res) => {
    knex
      .select
      .from
      .then((results) => {
        res.json(results);
    });
  });
  //Modify profile 
  router.PUT("/users/:id", (req, res) => {
    knex
      .select
      .from
      .then((results) => {
        res.json(results);
    });
  });
  //Every map has share/rate/favourite button N/A
  //Modify the point description
  router.PUT("/maps/:id/points/:id", (req, res) => {
    knex
      .select
      .from
      .then((results) => {
        res.json(results);
    });
  });
  //Delete point
  router.DELETE("/maps/:id/points/:id", (req, res) => {
    knex
      .select
      .from
      .then((results) => {
        res.json(results);
    });
  });

//End of routes
  return router;
}
