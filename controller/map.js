var express = require('express');
var mapRouter = new express.Router();
var MapQuery = require("../client/db/mapQuery");
var query = new MapQuery();

mapRouter.get("/", function(req, res) {
  query.allData(function(results) {
    res.json(results);
  })
})

module.exports = mapRouter;